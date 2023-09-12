<?php

namespace App\Http\Controllers;

use App\Models\CharityRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CharityController extends Controller
{
    public function getCharities()
    {
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

    public function requestDonation(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'category' => 'required|string|max:255',
                'quantity' => 'required|numeric',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed: ' . $e]);
        }

        $donationRequest = new CharityRequest;
        $donationRequest->charity_id = Auth::id();
        $donationRequest->title = $request->title;
        $donationRequest->category = $request->category;
        $donationRequest->description = $request->description;
        $donationRequest->quantity = $request->quantity;
        $donationRequest->save();

        return response()->json([
            'message' => 'success',
            'donationRequest' => $donationRequest
        ], 200);

    }
}
