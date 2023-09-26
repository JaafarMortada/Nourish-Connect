<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getWeekDaysRevenue()
    {
        $user = Auth::user();

        $endDate = Carbon::now();
        $startDate = $endDate->copy()->subDays(6);

        $carts = $user->inventories[0]->carts
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<=', $endDate)
            ->sortBy('created_at');
        $weekData = [];

        for ($i = 0; $i < 7; $i++) {
            $dayOfWeek = $startDate->format('l');

            $cartsForDay = $carts
                ->where('created_at', '>=', $startDate->startOfDay())
                ->where('created_at', '<', $startDate->copy()->endOfDay())
                ->values();

            $revenueForDay = $cartsForDay->sum(function ($cart) {
                return  $cart->items->sum(function ($item) {
                    return $item->price * $item->pivot->quantity;
                });
            });

            $weekData[] = [
                'day' => substr($dayOfWeek, 0, 3),
                'revenue' => $revenueForDay
            ];

            $startDate->addDay();
        }

        return response()->json([
            'message' => 'success',
            'weekData' => $weekData
        ], 200);
    }

    public function getTopFiveItems($by = '')
    {
        $carts = Auth::user()->inventories[0]->carts;

        $itemsSalesData = [];

        $thisMonthStart = Carbon::now()->startOfMonth();
        $thisMonthEnd = Carbon::now()->endOfMonth();

        foreach ($carts as $cart) {
            $thisMonthsItems = $cart->items->reject(function ($item) use ($thisMonthStart, $thisMonthEnd) {
                return Carbon::parse($item->pivot->created_at)->lt($thisMonthStart) || Carbon::parse($item->pivot->created_at)->gt($thisMonthEnd);
            });
            foreach ($thisMonthsItems as $item) {
                $item_name = $item->name;
                $quantity_sold = $item->pivot->quantity;
                $sold_value = $item->price * $quantity_sold;

                if (isset($itemsSalesData[$item_name])) {
                    $itemsSalesData[$item_name]['sold_value'] += $sold_value;
                    $itemsSalesData[$item_name]['quantity_sold'] += $quantity_sold;
                } else {
                    $itemsSalesData[$item_name] = [
                        'item_name' => $item_name,
                        'sold_value' => $sold_value,
                        'quantity_sold' => $quantity_sold,

                    ];
                }
            }
        }

        uasort($itemsSalesData, function ($a, $b) use ($by) {
            return ceil($b[$by]) - ceil($a[$by]);
        });

        $topFiveItems = array_slice($itemsSalesData, 0, 5);

        return response()->json([
            'message' => 'success',
            'top_five_items' => array_values($topFiveItems),
        ], 200);
    }
}
