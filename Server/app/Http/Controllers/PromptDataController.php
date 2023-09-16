<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;

class PromptDataController extends Controller
{
    public function getAiSuggestions()
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
        return response()->json($decodedValue, 200);
    }
}
