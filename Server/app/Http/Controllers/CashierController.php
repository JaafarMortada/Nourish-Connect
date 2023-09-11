<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CashierController extends Controller
{
    public function getCashiers() {
        $manager = Auth::user();
        $cashiersData = $manager->hasCashiers;

        $responseCashiers = $cashiersData->map(function ($cashierData) {
            
            $account = $cashierData->account;
            $mostRecentLogin = $cashierData->cashierLogins->max('created_at');
            $loginCount = $cashierData->cashierLogins->count();
    
            return [
                'username' => $account->username,
                'email' => $account->email,
                'pi_url' => $account->pic_ur,
                'login_count' => $loginCount,
                'most_recent_login' => $mostRecentLogin,
                'created_at' => $cashierData->created_at,
            ];
        });
    
        return response()->json([
            'message' => 'success',
            'cashiers' => $responseCashiers,
        ], 200);
    }
        
}
