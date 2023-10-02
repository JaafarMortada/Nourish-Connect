<?php

namespace App\Http\Controllers;

use App\Models\CharityRequest;
use App\Models\Donation;
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
                'charity_id' => $charity->id,
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

    public function getRequestsData(){
        $requests = Auth::User()->charityRequests;

        $responseRequests = $requests->map(function ($request) {
            $quantity = 0;
            $donators = [];
            foreach($request->donations as $donation) {
                $donators[] = $donation->donator->company_name;
                foreach($donation->donationItems as $item) {
                    $quantity += $item->quantity;
                }

            }
            if ($quantity == 0 || $quantity < intval($request->quantity)){
                $status = false;
            } else {
                $status = true;
            }
            return [
                "title" => $request->title,
                "category" => $request->category,
                "requested_quantity" => intval($request->quantity),
                "received_quantity" => $quantity,
                "donated_by" => $donators,
                "status" => $status,
                "created_at" => $request->created_at
            ];
        });

        return response()->json([
            'message' => 'success',
            'donations' => $responseRequests->sortByDesc('created_at')->values()
        ], 200);
    }
}
