<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function searchUsers($search)
    {
        if (!$search){
            return response()->json([
                'message' => 'provide a search term',
    
            ], 200);
        }
        if (Auth::user()->usertype_id == 1) {
            $contacts = UserType::where("id", 3)->first()->users();
        } else {
            $contacts = UserType::where("id", 1)->first()->users();
        }

        $searchResult = $contacts->where('company_name', 'like', '%' . $search . '%')->get();
        
        $ReturnedSearchResult = $searchResult->map(function ($user) {
            return [
                'id' => $user->id,
                'company_name' => $user->company_name,
                'pic_url' => $user->pic_url,
            ];
        });

        return response()->json([
            'message' => 'success',
            'contacts' => $ReturnedSearchResult,

        ], 200);
    }

    public function saveNewMessage(Request $request) {
        try{
            $request->validate([
                'text' => 'required|string',
                'receiver_id' => 'required|numeric',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed: '. $e]);
        }
        
        $newMessage = new Chat;
        $newMessage->text = $request->text;
        $newMessage->sender_id = Auth::id();
        $newMessage->receiver_id = intval($request->receiver_id);
        $newMessage->save();

        unset($newMessage->updated_at);
        unset($newMessage->id);

        return response()->json([
            'message' => 'success',
            'new_message' => $newMessage,

        ], 200);
    }
}