<?php

namespace App\Imports;

use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class ItemsImport implements ToModel, WithHeadingRow
{

    public function model(array $row)
    {
            return new Item([
            'name'     => $row['name'],
            'description'    => $row['description'],
            'price'    => $row['price'],
            'original_price'    => $row['original_price'],
            'initial_quantity' => $row['initial_quantity'],
            'available_quantity' => $row['initial_quantity'],
            'production_date' => $row['production_date'],
            'expiry_date' => $row['expiry_date'],
            'category' => $row['category'],
            'barcode' => $row['barcode'],
            'inventory_id' => Auth::user()->cashiers[0]->company->inventories[0]->id,
        ]);

        
    }
}
