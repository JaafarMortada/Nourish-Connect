<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function searchUsers($search)
    {

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
}
