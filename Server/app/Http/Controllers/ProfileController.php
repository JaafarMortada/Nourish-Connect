<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile() {
        try{
            $user = Auth::user();
            if($user && ($user->usertype_id == 1 || $user->usertype_id == 3)){
                
            } else {
                return response()->json([
                    'message' => 'Unauthorized',
                ], 401);
            }
        }
        catch(\Throwable $e){
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user->donations_count = $user->donationDonators->count();
        $user->latitude = $user->location->latitude;
        $user->longitude = $user->location->longitude;
        unset($user->donationDonators);
        unset($user->location);
        return response()->json([
            'message' => 'success',
            'profile' => $user,

        ], 200);
    }
}
