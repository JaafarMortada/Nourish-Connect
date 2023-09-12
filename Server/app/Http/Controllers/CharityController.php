<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CharityController extends Controller
{
    public function getCharities(){
        $charities = User::where('usertype_id', 3)->get();
       
        $responseCharities = $charities->map(function ($charity) {
            $location = $charity->location;
            return [
                'company_name' => $charity->company_name,
                'email' => $charity->email,
                'pic_url' => $charity->pic_url,
                'latitude' => $location->latitude,
                'longitude' => $location->longitude,
            ];
        });

        return response()->json([
            'message' => 'success',
            'charities' => $responseCharities,
        ], 200);
    
    }
}
