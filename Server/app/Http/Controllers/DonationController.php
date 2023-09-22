<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\DonationItem;
use App\Models\DonationSuggestion;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function getDonationsData()
    {
        $donations = Auth::User()->donationDonators;

        $responseDonations = $donations->map(function ($donation) {

            $items = $donation->donationItems;
            $quantity = 0;

            foreach ($items as $item) {
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
            'donations' => $responseDonations->sortByDesc('donated_at')->values()
        ], 200);
    }

    public function getDonationsStats()
    {
        $user = Auth::user();
        $donations = $user->donationDonators;

        $donationsData = $donations->map(function ($donation) {
            $items = $donation->donationItems;
            return [
                "total_items" => $items->sum('quantity'),
                "donated_to" => $donation->toRequest->requestedBy->id,
                "items" => $items->all()
            ];
        });
        $item_worth = $donationsData->pluck('items')->flatten()->sum(function ($donationItem) {
            return $donationItem->item->price * $donationItem->quantity;
        });

        return response()->json([
            'message' => 'success',
            'stats' => [
                'number_of_donations' => ["Made", $donations->count(), "donations"],
                'number_of_charities' => ["Helped", $donationsData->unique('donated_to')->count(), "charities"],
                'number_of_items' => ["Saved", $donationsData->sum('total_items'), "items"],
                'items_worth' => ["Donated", $item_worth, "worth of items"],
            ],

        ], 200);
    }

    public function approveDonation($suggestion_id)
    {
        $suggestion = DonationSuggestion::where('id', $suggestion_id)->first();
        if ($suggestion->approved == 1) {
            return response()->json([
                'message' => 'This donation is already approved',
            ]);
        }

        $suggestion->approved = 1;

        $request_id = $suggestion->request_id;
        $receiver_id = $suggestion->toRequest->charity_id;
        $donator_id = Auth::id();

        $item_id = $suggestion->item_id;
        $dbItem = Item::where('id', $item_id)->first();
        if (is_null($dbItem) || $dbItem->available_quantity <= 0) {
            return response()->json([
                'message' => 'This item is sold out, donation failed',
            ]);
        }

        $quantity_to_donate = min($dbItem->available_quantity, intval($suggestion->quantity));
        $new_quantity = $dbItem->available_quantity - $quantity_to_donate;
        $dbItem->available_quantity = $new_quantity;
        $dbItem->save();

        $donation_title = $quantity_to_donate . " items of " . $suggestion->hasItem->name;
        $donation_description = $quantity_to_donate . " items of " . $suggestion->hasItem->name;

        $newDonation = new Donation;
        $newDonation->title = $donation_title;
        $newDonation->title = $donation_title;
        $newDonation->description = $donation_description;
        $newDonation->donator_id = $donator_id;
        $newDonation->receiver_id = $receiver_id;
        $newDonation->request_id = $request_id;
        $newDonation->save();

        $newDonationItem = new DonationItem;
        $newDonationItem->item_id = $item_id;
        $newDonationItem->quantity = $quantity_to_donate;
        $newDonationItem->donation_id = $newDonation->id;
        $newDonationItem->save();

        $suggestion->save();


        return response()->json([
            'message' => 'success',
            'test' => $newDonation,


        ], 200);
    }
}
