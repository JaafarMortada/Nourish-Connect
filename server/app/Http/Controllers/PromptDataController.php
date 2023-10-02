<?php

namespace App\Http\Controllers;

use App\Models\DiscountSuggestion;
use App\Models\DonationSuggestion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;

class PromptDataController extends Controller
{
    public function getAiSuggestions($for)
    {

        $charities = User::where("usertype_id", 3)->get();

        $charitiesData = $charities->map(function ($charity) {

            $requestsData = $charity->charityRequests->map(function ($request) {
                $quantity = 0;
                foreach ($request->donations as $donation) {
                    foreach ($donation->donationItems as $item) {
                        $quantity += $item->quantity;
                    }
                }

                if ($quantity == 0 || $quantity < intval($request->quantity)) {
                    return [
                        "id" => $request->id,
                        "title" => $request->title,
                        "description" => $request->description,
                        "category" => $request->category,
                        "requested_quantity" => intval($request->quantity),
                        "received_quantity" => $quantity,

                    ];
                }
            });

            return [
                'id' => $charity->id,
                'requests' => $requestsData,

            ];
        });


        $items = Auth::user()->inventories[0]->items()->where('expiry_date', '<=', now()->addWeeks(2))
            ->get();

        $itemsData = $items->map(function ($item) {
            return [
                "id" => $item->id,
                "name" => $item->name,
                "description" => $item->description,
                "expiry_date" => $item->expiry_date,
                "category" => $item->category,
                "available_quantity" => $item->available_quantity,
            ];
        });


        $forgeApiKey = env('FORGE_KEY');

        $requestData = [
            'user_inputs' => [
                'data_4' => [
                    'value' => json_encode([
                        'charities' => $charitiesData,
                        'items' => $itemsData,
                    ]),
                ],
            ],
        ];

        $client = new Client();

        $headers = [
            'X-API-KEY' => $forgeApiKey,
            'Content-Type' => 'application/json',
        ];

        $response = $client->post(
            'https://api.theforgeai.com/v1/apps/6505cafe9c17dbee391e41a9/view/run',
            [
                'headers' => $headers,
                'json' => $requestData,
            ]
        );

        $responseData = json_decode($response->getBody(), true);
        $decodedValue = json_decode($responseData['user_outputs']['Node_Name_7']['value'], true);
        if ($for == "donations") {
            if (isset($decodedValue['response']['donation_suggestions'])) {
                try {
                    foreach ($decodedValue['response']['donation_suggestions'] as $donationSuggestion) {
                        if (!$donationSuggestion['request_id']) {
                            continue;
                        }

                        $suggestion = new DonationSuggestion;
                        $suggestion->item_id = $donationSuggestion['item_id'];
                        $suggestion->charity_id = $donationSuggestion['charity_id'];
                        $suggestion->quantity = $donationSuggestion['quantity_to_donate'];
                        $suggestion->request_id = $donationSuggestion['request_id'];
                        $suggestion->save();
                    }
                } catch (\Throwable $e) {
                    return response()->json([
                        'message' => 'unable to generate donation suggestions',
                    ], 200);
                }
            } else {
                return response()->json([
                    'message' => 'unable to generate donation suggestions',

                ], 200);
            }
        } elseif ($for == "discounts") {
            if (isset($decodedValue['response']['discount_suggestions'])) {
                try {
                    foreach ($decodedValue['response']['discount_suggestions'] as $discountSuggestion) {
                        $suggestion = new DiscountSuggestion;
                        $suggestion->item_id = $discountSuggestion['item_id'];
                        $suggestion->percentage = $discountSuggestion['discount_percentage'];
                        $suggestion->until = $discountSuggestion['discount_until'];
                        $suggestion->save();
                    }
                } catch (\Throwable $e) {
                    return response()->json([
                        'message' => 'unable to generate discount suggestions',

                    ], 200);
                }
            } else {
                return response()->json([
                    'message' => 'unable to generate discount suggestions',

                ], 200);
            }
        }



        return response()->json([
            'message' => 'success',

        ], 200);
    }
}
