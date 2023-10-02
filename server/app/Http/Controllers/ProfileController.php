<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        if ($user->usertype_id == 1) {
            $user->donations_count = $user->donationDonators->count();
            unset($user->donationDonators);
        }
        if ($user->usertype_id == 3) {
            $user->donations_count = $user->donationReceivers->count();
            unset($user->donationReceivers);
        }
        
        $user->latitude = $user->location->latitude;
        $user->longitude = $user->location->longitude;
        
        unset($user->location);
        return response()->json([
            'message' => 'success',
            'profile' => $user,

        ], 200);
    }

    public function editProfile(Request $request) {
        try{
            $request->validate([
                'image' => 'sometimes|image',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed: '. $e]);
        }
        $user = User::where('id', Auth::id())->first();

        if (!is_null($request->file('image'))) {
            $profilePicture = $request->file('image');
            $file_name = time() . '_' . uniqid() . "_user_image." . $profilePicture->getClientOriginalExtension();
            $profilePicture->storeAs('public/profilePictures', $file_name);
            $user->pic_url = "profilePictures/" .$file_name;
            
        }
        $user->save();
        return response()->json([
            'message' => 'success',

        ], 200);
    }
}
