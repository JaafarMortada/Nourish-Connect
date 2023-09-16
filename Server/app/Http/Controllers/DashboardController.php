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
                ->where('created_at', '<', $startDate->copy()->addDay()->endOfDay())
                ->values();

            $revenueForDay = $cartsForDay->sum(function ($cart) {
                return  $cart->items->sum(function ($item) {
                    return $item->price * $item->pivot->quantity;
                });
            });

            $weekData[] = [
                'day' => $dayOfWeek,
                'revenue' => $revenueForDay
            ];

            $startDate->addDay();
        }

        return response()->json([
            'message' => 'success',
            'weekData' => $weekData
        ], 200);
    }
}
