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
  /**
   * Display a listing of the orders.
   */
  public function index(Request $request): Response
  {
    // Get the authenticated user and their role
    $user = Auth::user();
    $userRole = $user->role; // Assuming the role is stored in the 'role' field of the user model
    $userId = $user->id;

    // Start the query for orders
    $ordersQuery = Order::query()
      ->when($userRole === 'Admin', function ($query) {
        // If the user is Admin, eager load the 'branch' and 'items' relationships
        return $query->with(['branch', 'items.item']);
      })
      ->when($userRole === 'Cabang', function ($query) use ($userId) {
        // If the user is Cabang, filter orders by their 'branch_id' and eager load the 'items' relationship
        return $query->where('branch_id', $userId)->with('items');
      })
      ->latest(); // Order by the most recent orders

    // Get the orders from the query
    $orders = $ordersQuery->get();

    // Format the data as needed
    $orders = $orders->map(function ($order) {
      $formattedItems = $order->items->map(function ($orderItem) {
        return [
          'id' => $orderItem->item->id,
          'code' => $orderItem->item->code,
          'name' => $orderItem->item->name,
          'unit' => $orderItem->item->unit,
          'quantity' => $orderItem->quantity, // Include quantity from the pivot table
        ];
      });

      return [
        'order_id' => $order->id,
        'code' => $order->code,
        'status' => $order->status,
        'items' => $formattedItems,
        'created_at' => $order->created_at,
        'updated_at' => $order->updated_at,
      ];
    });

    return Inertia::render('Orders/Index', [
      'page_title' => 'Daftar Pesanan',
      'orders' => $orders,
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
//          'price' => $orderItem->item->price ?? 0,
//          'total' => ($orderItem->item->price ?? 0) * $orderItem->quantity,
        ];
      }),
//      'total' => $order->items->reduce(function ($carry, $orderItem) {
//        return $carry + (($orderItem->item->price ?? 0) * $orderItem->quantity);
//      }, 0),
//      'customer' => [
//        'name' => Auth::user()->name,
//        'phone' => Auth::user()->phone_number ?? 'N/A',
//        'motor' => $request->input('motor', 'N/A'),
//        'license_plate' => $request->input('license_plate', 'N/A'),
//      ],
    ];

    $directoryPath = storage_path('app/public/orders');
    if (!is_dir($directoryPath)) {
      mkdir($directoryPath, 0755, true); // Create the directory if it doesn't exist
    }

    $fileName = "order_{$order->code}.pdf";
    $filePath = $directoryPath . "/{$fileName}";

    $pdf = Pdf::loadView('pdf.order', $pdfData);
    $pdf->save($filePath);

    return redirect()->route('orders.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Pesanan Berhasil Dibuat',
        'message' => 'Pesanan baru telah berhasil dibuat.',
        'pdf_url' => asset("storage/orders/{$fileName}"),
      ]);
  }


  /**
   * Show the form for creating a new order.
   */
  public function create(): Response
  {
    return Inertia::render('Orders/Create', [
      'page_title' => 'Buat Pesanan',
    ]);
  }

  /**
   * Display the specified order.
   */
  public function show(Order $order): Response
  {
    $order->load('items.item');

    return Inertia::render('Orders/Show', [
      'page_title' => 'Detail Pesanan',
      'order' => $order,
    ]);
  }

  /**
   * Update the status of the specified order.
   */
  public function update(Request $request, Order $order)
  {
    $order->update(['status' => $request->status]);

    return redirect()->route('orders.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Pesanan Berhasil Diperbarui',
        'message' => 'Status pesanan telah berhasil diperbarui.',
      ]);
  }

  /**
   * Remove the specified order from storage.
   */
  public function destroy(Order $order)
  {
    $order->delete();

    return redirect()->route('orders.index')
      ->with('notification', [
        'status' => 'success',
        'title' => 'Pesanan Berhasil Dihapus',
        'message' => 'Pesanan telah berhasil dihapus.',
      ]);
  }
}
