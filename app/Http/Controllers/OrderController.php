<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusProof;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
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
    try {
      $user = Auth::user();
      $userRole = $user->role;
      $userId = $user->id;

      $orders = Order::query()
        ->when($userRole === 'Admin', function ($query) {
          $query->with(['branch', 'items.item']);
        })
        ->when($userRole === 'Cabang', function ($query) use ($userId) {
          $query->where('branch_id', $userId)->with('items');
        })
        ->latest()
        ->get()
        ->map(function ($order) {
          $formattedItems = $order->items->map(function ($orderItem) {
            return [
              'id' => $orderItem->item->id,
              'code' => $orderItem->item->code,
              'name' => $orderItem->item->name,
              'unit' => $orderItem->item->unit,
              'quantity' => $orderItem->quantity,
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
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Memuat Pesanan',
        'message' => 'Terjadi kesalahan saat memuat daftar pesanan.',
      ]);
    }
  }

  /**
   * Store a newly created order.
   */
  public function store(Request $request)
  {
    try {
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
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Membuat Pesanan',
        'message' => 'Terjadi kesalahan saat membuat pesanan baru.',
      ]);
    }
  }

  /**
   * Show the form for creating a new order.
   */
  public function create(): Response
  {
    try {
      return Inertia::render('Orders/Create', [
        'page_title' => 'Buat Pesanan',
      ]);
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Memuat Halaman',
        'message' => 'Terjadi kesalahan saat memuat halaman pembuatan pesanan.',
      ]);
    }
  }

  /**
   * Display the specified order.
   */
  public function show(Order $order): Response
  {
    try {
      $order->load('items.item');

      return Inertia::render('Orders/Show', [
        'page_title' => 'Detail Pesanan',
        'order' => $order,
      ]);
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Memuat Pesanan',
        'message' => 'Terjadi kesalahan saat memuat detail pesanan.',
      ]);
    }
  }

  /**
   * Update the status of the specified order.
   */
  public function update(Request $request, Order $order)
  {
    try {
      $order->update(['status' => $request->status]);

      return redirect()->route('orders.index')->with('notification', [
        'status' => 'success',
        'title' => 'Pesanan Berhasil Diperbarui',
        'message' => 'Status pesanan telah berhasil diperbarui.',
      ]);
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Memperbarui Pesanan',
        'message' => 'Terjadi kesalahan saat memperbarui status pesanan.',
      ]);
    }
  }

  /**
   * Remove the specified order from storage.
   */
  public function destroy(Order $order)
  {
    try {
      $order->delete();

      return redirect()->route('orders.index')->with('notification', [
        'status' => 'success',
        'title' => 'Pesanan Berhasil Dihapus',
        'message' => 'Pesanan telah berhasil dihapus.',
      ]);
    } catch (Exception $e) {
      return redirect()->back()->with('notification', [
        'status' => 'error',
        'title' => 'Gagal Menghapus Pesanan',
        'message' => 'Terjadi kesalahan saat menghapus pesanan.',
      ]);
    }
  }
}
