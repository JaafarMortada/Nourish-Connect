<?php

namespace App\Imports;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class SalesImport implements ToModel, WithHeadingRow
{

    private $cart_id;

    public function __construct($cart_id)
    {
        $this->cart_id = $cart_id;
    }


    public function model(array $row)
    {
        
        $dbItem = Item::where('id', $row['id'])->first();
        if (is_null($dbItem) || $dbItem->available_quantity <= 0) {
            return;
        }

        $quantity_to_checkout = min($dbItem->available_quantity, $row['quantity']);
        $new_quantity = $dbItem->available_quantity - $quantity_to_checkout;
        $dbItem->available_quantity = $new_quantity;
        $dbItem->save();
        return new CartItem([
            'item_id'     => $dbItem->id,
            'cart_id'    => $this->cart_id,
            'quantity'    => $quantity_to_checkout,

        ]);
    }
}
