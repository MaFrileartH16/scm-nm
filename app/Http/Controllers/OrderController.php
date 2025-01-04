<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusProof;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
  public function index(Request $request): Response
  {
    $user = Auth::user();
    $userRole = $user->role;
    $userId = $user->id;

    $orders = Order::query()
      ->when($userRole === 'Cabang', function ($query) use ($userId) {
        // Filter orders by branch_id for Cabang role
        $query->where('branch_id', $userId)->with('items');
      })
      ->when($userRole === 'Admin' || $userRole === 'Kurir', function ($query) {
        // For Admin and Kurir roles, include all orders
        $query->with(['items.item', 'statusProofs', 'branch']);
      })
      ->latest()
      ->get()
      ->map(function ($order) {
        // Get the latest status proof entry manually
        $latestProof = $order->statusProofs()->get()->last();

        return [
          'order_id' => $order->id,
          'code' => $order->code,
          'status' => $order->status,
          'items' => $order->items->map(function ($orderItem) {
            return [
              'id' => $orderItem->item->id,
              'code' => $orderItem->item->code,
              'name' => $orderItem->item->name,
              'unit' => $orderItem->item->unit,
              'quantity' => $orderItem->quantity,
            ];
          }),
          'proof_image_path' => $latestProof?->proof_image_path,
          'created_at' => $order->created_at,
          'updated_at' => $order->updated_at,
        ];
      });

    return Inertia::render('Orders/Index', [
      'page_title' => 'Daftar Pesanan',
      'orders' => $orders,
    ]);
  }


  public function changeStatus(Request $request, Order $order)
  {
    $order->update(['status' => $request->status]);

    $proofData = [
      'order_id' => $order->id,
      'status' => $request->status,
    ];

    if ($request->hasFile('proof_image')) {
      $path = $request->file('proof_image')->store('proofs', 'public');
      $proofData['proof_image_path'] = $path;
    }

    // Insert directly into the `order_status_proofs` table without timestamps or id.
    OrderStatusProof::create($proofData);

    return redirect()->route('orders.index')->with('notification', [
      'status' => 'success',
      'title' => 'Status Updated',
      'message' => 'The order status has been successfully updated.',
    ]);
  }

  public function store(Request $request)
  {
    $order = Order::create([
      'code' => strtoupper(uniqid('ORD-')),
      'branch_id' => Auth::id(),
      'status' => 'Belum Disetujui',
    ]);

    foreach ($request->items as $item) {
      OrderItem::create([
        'order_id' => $order->id,
        'item_id' => $item['itemId'],
        'quantity' => $item['quantity'],
      ]);
    }

    OrderStatusProof::create([
      'order_id' => $order->id,
      'status' => 'Belum Disetujui',
    ]);

    $order->load('items.item');

    $pdfData = [
      'order' => $order,
      'items' => $order->items->map(function ($orderItem) {
        return [
          'code' => $orderItem->item->code,
          'name' => $orderItem->item->name,
          'unit' => $orderItem->item->unit,
          'quantity' => $orderItem->quantity,
        ];
      }),
    ];

    $directoryPath = storage_path('app/public/orders');
    if (!is_dir($directoryPath)) {
      mkdir($directoryPath, 0755, true);
    }

    $fileName = "order_{$order->code}.pdf";
    $filePath = $directoryPath . "/{$fileName}";

    $pdf = Pdf::loadView('pdf.order', $pdfData);
    $pdf->save($filePath);

    return redirect()->route('orders.index')->with('notification', [
      'status' => 'success',
      'title' => 'Pesanan Berhasil Dibuat',
      'message' => 'Pesanan baru telah berhasil dibuat.',
      'pdf_url' => asset("storage/orders/{$fileName}"),
    ]);
  }

  public function create(): Response
  {
    return Inertia::render('Orders/Create', [
      'page_title' => 'Buat Pesanan',
    ]);
  }

  public function destroy(Order $order)
  {
    $order->delete();

    return redirect()->route('orders.index')->with('notification', [
      'status' => 'success',
      'title' => 'Pesanan Berhasil Dihapus',
      'message' => 'Pesanan telah berhasil dihapus.',
    ]);
  }

  public function show(Order $order): Response
  {
    $order->load('items.item');

    return Inertia::render('Orders/Show', [
      'page_title' => 'Detail Pesanan',
      'order' => $order,
    ]);
  }
}
