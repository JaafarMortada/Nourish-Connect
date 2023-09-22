<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\DiscountItem;
use App\Models\DiscountSuggestion;
use App\Models\Item;
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
            'discounts' => $responseDiscounts->sortByDesc('started_at')->values()
        ], 200);
    }

    public function approveDiscount(Request $request ,$suggestion_id) {
        $discountSuggestion = DiscountSuggestion::where('id', $suggestion_id)->first();
        $discountUntil = Carbon::parse($discountSuggestion->until);
        if ($discountSuggestion->approved == 1 || !$discountUntil->isFuture()) {
            return response()->json([
                'message' => 'Error approving discount',
            ]);
        }

        $discountSuggestion->approved = 1;

        $item_id = $discountSuggestion->item_id;
        $dbItem = Item::where('id', $item_id)->first();
        if (is_null($dbItem) || $dbItem->available_quantity <= 0) {
            return response()->json([
                'message' => 'This item is sold out, discount approval failed',
            ]);
        }

        $newDiscount = new Discount;
        $newDiscount->title = $discountSuggestion->percentage * 100 . "% discount on " . $dbItem->name;
        $newDiscount->description = $request->description;
        $newDiscount->percentage = $discountSuggestion->percentage;
        $newDiscount->company_id = Auth::id();
        $newDiscount->until =  $discountSuggestion->until;
        $newDiscount->save();

        $newDiscountItem = new DiscountItem;
        $newDiscountItem->item_id = $discountSuggestion->item_id;
        $newDiscountItem->quantity = $dbItem->available_quantity;
        $newDiscountItem->discount_id = $newDiscount->id;
        $newDiscountItem->save();

        $discountSuggestion->save();

        return response()->json([
            'message' => 'success',

        ], 200);
    }
}
