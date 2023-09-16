<?php

namespace App\Http\Controllers;

use App\Imports\ItemsImport;
use App\Imports\SalesImport;
use App\Models\Cart;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExcelController extends Controller
{
    public function uploadExcelOrCSV(Request $request, $for)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        $file = $request->file('file');
        $fileExtension = $file->getClientOriginalExtension();
        $file_name = time() . '_' . uniqid() . "_excel." . $fileExtension;
        $file->storeAs('public/excel', $file_name);
        $excelFilePath = storage_path('app/public/excel/' . $file_name);
        if ($for == 'items') {
            Excel::import(new ItemsImport, $excelFilePath);
        } elseif ($for == 'sales') {
            $inventory_id = Auth::user()->cashiers[0]->company->inventories[0]->id;
            $cart = new Cart();
            $cart->inventory_id = $inventory_id;
            $cart->barcode = uniqid($inventory_id . "-", true);
            $cart->save();
            Excel::import(new SalesImport($cart->id), $excelFilePath);
        }

        return response()->json([
            'message' => 'data imported successfully',

        ], 200);
    }
}
