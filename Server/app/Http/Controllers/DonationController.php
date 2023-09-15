<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function getDonationsData(){
        $donations = Auth::User()->donationDonators;
        
        $responseDonations = $donations->map(function ($donation) {

            $items = $donation->donationItems;
            $quantity = 0;

            foreach($items as $item) {
                $quantity += $item->quantity;
            }

            return [
                "title" => $donation->title,
                "number_of_products" => $quantity,
                "donated_at" => $donation->created_at,
                "donated_to" => $donation->toRequest->requestedBy->company_name,

            ];
        });

        return response()->json([
            'message' => 'success',
            'donations' => $responseDonations
        ], 200);
    }

    public function getDonationsStats(){
        $user = Auth::user();
        $donations = $user->donationDonators;

        $donationsData = $donations->map(function ($donation) {
            $items = $donation->donationItems;
            return [
                "total_items" => $items->sum('quantity'),
                "donated_to" => $donation->toRequest->requestedBy->id,

            ];
        });

        return response()->json([
            'message' => 'success',
            'number_of_donations' => $donations->count(),
            'number_of_charities' => $donationsData->unique('donated_to')->count(),
            'number_of_items' => $donationsData->sum('total_items'),

        ], 200);
    }
}
