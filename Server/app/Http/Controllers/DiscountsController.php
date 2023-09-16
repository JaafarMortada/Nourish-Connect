<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DiscountsController extends Controller
{
    public function getDiscountsData(){
        $discounts = Auth::User()->discounts;
        
        $responseDiscounts = $discounts->map(function ($discount) {

            $untilDate = Carbon::parse($discount->until);

            $timeLeft = $untilDate->isFuture() ? $untilDate->diffForHumans() : 'Expired';
            $itemsData = $discount->items->map(function ($item) {
                return [
                    'name' => $item->name,
                    'quantity_on_discount' => $item->pivot->quantity,

                ];
            });
            return [
                "title" => $discount->title,
                "description" => $discount->description,
                "started_at" => $discount->created_at,
                "time_left" => $timeLeft,
                "items" => $itemsData,

            ];
        });

        return response()->json([
            'message' => 'success',
            'discounts' => $responseDiscounts
        ], 200);
    }
}
