<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;

use function Laravel\Prompts\search;

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
}
