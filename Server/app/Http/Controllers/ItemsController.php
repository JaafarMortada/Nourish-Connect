<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;

class ItemsController extends Controller
{
    public function addItem(Request $request) {
        try{
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric', 
                'original_price' => 'required|numeric',
                'quantity' => 'required|numeric',
                'production_date' => 'date',
                'expiry_date' => 'date',
                'image' => [File::image()],
                'category' => 'required|string|max:255',
                'barcode' => 'required|string',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed: '. $e]);
        }
        
        $item = new Item();
        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->original_price = $request->original_price;
        $item->initial_quantity = $request->quantity;
        $item->available_quantity = $request->quantity;
        $item->category = $request->category;
        $item->barcode = $request->barcode;

        if (!(is_null($request->production_date) && is_null($request->expiry_date))) {
            $item->production_date = $request->production_date;
            $item->expiry_date = $request->expiry_date;
        }

        if (!is_null($request->file('image'))) {
            $item_image = $request->file('image');
            $file_name = time() . '_' . uniqid() . "_item_image." . $item_image->getClientOriginalExtension();
            $item_image->storeAs('public/itemsImages', $file_name);
            $item->pic_url = "itemsImages/" .$file_name;
        }

        $inventory = Auth::user()->cashiers[0]->company->inventories[0];
        $item->inventory_id = $inventory->id;
        $item->save();

        return response()->json([
            'message' => 'Item added successfully',
            'item' => $item
        ], 200);
    }

    public function getItems($search = null){

        $inventory_id = Auth::user()->cashiers[0]->company->inventories[0]->id;
        $query = Item::where('inventory_id', $inventory_id);
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('name', 'like', '%' . $search . '%')
                    ->orWhere('category', $search)
                    ->orWhere('barcode', $search);
            });
        }

        $items = $query->get();

        return response()->json([
            'message' => 'success',
            'item' => $items
        ], 200);
    }

    public function checkoutReceipt(Request $request){

        $receiptJSON = json_decode($request->receipt);

        if (is_null($receiptJSON)){
            return response()->json(["message" => "Invalid Format"]);
        }
        
        $cart = new Cart;
        $cart->inventory_id = $request->inventory_id;
        $cart->barcode = uniqid($request->inventory_id."-", true);
        $cart->save();
        foreach($receiptJSON as $receiptItem){
            $dbItem = Item::where('id', $receiptItem->id)->first();
            if (is_null($dbItem) || $dbItem->available_quantity <= 0){
                continue;
            }
            $quantity_to_checkout = min($dbItem->available_quantity, $receiptItem->quantity);
            $new_quantity = $dbItem->available_quantity - $quantity_to_checkout;
            $dbItem->available_quantity = $new_quantity;
            $dbItem->save();
            $cartItem = new CartItem;
            $cartItem->item_id = $dbItem->id;
            $cartItem->cart_id = $cart->id;
            $cartItem->quantity = $quantity_to_checkout;
            $cartItem->save();
        }
        return response()->json([
            'message' => 'success',
            'cart' => $cart->items
        ], 200);
    }

    public function getReceipt($search = null){

        $inventory_id = Auth::user()->cashiers[0]->company->inventories[0]->id;

        $query = Cart::where('inventory_id', $inventory_id);
        if ($search) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->where('barcode', $search)
                    ->orWhere('id', $search);
            });
        }

        $carts = $query->get();
        $cartsData = $carts->map(function ($cart) {
            return [
                'id' => $cart->id,
                'created_at' => $cart->created_at,
                'barcode' => $cart->barcode,
                'total_price' => $cart->items->sum(function ($item) {
                    return $item->price * $item->pivot->quantity;
                }),
                'total_items' => $cart->items->sum('pivot.quantity'),
            ];
        });
    
        return response()->json([
            'message' => 'success',
            'carts' => $cartsData,
        ], 200);
    }
}
