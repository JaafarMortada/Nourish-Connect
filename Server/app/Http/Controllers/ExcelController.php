<?php

namespace App\Http\Controllers;

use App\Imports\ItemsImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExcelController extends Controller
{
    public function uploadExcelOrCSV(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        $file = $request->file('file');
        $fileExtension = $file->getClientOriginalExtension();
        $file_name = time() . '_' . uniqid() . "_excel." . $fileExtension;
        $file->storeAs('public/excel', $file_name);
        $excelFilePath = storage_path('app/public/excel/' . $file_name);

        Excel::import(new ItemsImport, $excelFilePath);
        
        return response()->json([
            'message' => 'data imported successfully',

        ], 200);
    }
}
