<?php

namespace App\Http\Controllers;

use App\Models\CharityRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuggestionsController extends Controller
{
    public function getDonationsSuggestions()
    {
        $user = Auth::user();
        $items = $user->inventories[0]->items;

        $donationSuggestionsData = $items->map(function ($item) {

            $maxAge = Carbon::now()->subWeeks(2);

            $pendingSuggestions = $item->suggestedInDonations->reject(function ($donation) use ($maxAge) {
                return $donation->pivot->approved == 1 || Carbon::parse($donation->pivot->created_at)->lt($maxAge);
            });

            $donationSuggestions = $pendingSuggestions->map(function ($suggestion) use ($item) {
                $request = CharityRequest::where('id', $suggestion->pivot->request_id)->first();

                $quantity = 0;
                $donators = [];
                foreach ($request->donations as $donation) {
                    $donators[] = $donation->donator->company_name;
                    foreach ($donation->donationItems as $donationItem) {
                        $quantity += $donationItem->quantity;
                    }
                }
                if (!($quantity == 0 || $quantity < intval($request->quantity))) {
                    return null;
                }

                return [
                    "item_name" => $item->name,
                    "suggestion_id" => $suggestion->pivot->id,
                    "charity_name" => $suggestion->company_name,
                    "quantity_to_donate" => $suggestion->pivot->quantity,
                    "request_title" => $request->title,
                    "request_description" => $request->description,
                    "request_category" => $request->category,
                    "requested_quantity" => intval($request->quantity),

                ];
            });
            return $donationSuggestions->filter(function ($donation) {
                return !is_null($donation);
            })->toArray();
            
        })->filter(function ($donations) {
            return !empty($donations);
        })->flatten(1);
        return response()->json([
            'message' => 'success',
            'donation_suggestions' => $donationSuggestionsData,

        ], 200);
    }
}
