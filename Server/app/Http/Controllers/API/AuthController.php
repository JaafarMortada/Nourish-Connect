<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\UserType;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cashier;
use App\Models\CashierLogin;
use App\Models\Inventory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request, $refresh = null)
    {
        try {
            if (!$refresh) {
                $request->validate([
                    'email' => 'required|string|email',
                    'password' => 'required|string',
                ]);
            }
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed']);
        }

        if ($refresh) {
            $token = Auth::refresh();
        } else {
            $credentials = $request->only('email', 'password');
            $token = Auth::attempt($credentials);
        }

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;

        if ($user->usertype_id === 2) {
            $cashier = Cashier::where('cashier_id', $user->id)->first();
            $cashier_login = new CashierLogin;
            $cashier_login->cashier_id = $cashier->id;
            $cashier_login->save();
            $inventory_id = Auth::user()->cashiers[0]->company->inventories[0]->id;
        }
        $inventory_id = null;
        if ($user->usertype_id === 2) {
            $inventory_id = $user->cashiers[0]->company->inventories[0]->id;
            unset($user->cashiers);
        } elseif ($user->usertype_id === 1) {
            $inventory_id = $user->inventories[0]->id;
            unset($user->inventories);
        }

        $user->inventory_id = $inventory_id;
        unset($user->created_at);
        unset($user->updated_at);
        unset($user->location_id);

        return response()->json([
            'message' => 'logged in successfully',
            'user' => $user
        ], 200);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'company_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'password' => 'required|string|min:8',
                'role' => 'required|string|max:255',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed']);
        }

        $role = UserType::where('usertype', $request->role)->first();

        $location = new Location;
        $location->latitude = $request->latitude;
        $location->longitude = $request->longitude;
        $location->save();

        $user = new User;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->company_name = $request->company_name;
        $user->usertype_id = $role->id;
        $user->location_id = $location->id;
        $user->password = Hash::make($request->password);
        $user->save();
        $inventory_id = null;
        if ($role->id === 1) {
            $inventory = new Inventory();
            $inventory->company_id = $user->id;
            $inventory->location_id = $location->id;
            $inventory->description = "This is " . $request->company_name . "'s inventory.";
            $inventory->save();
            $inventory_id = $inventory->id;
        }

        $token = Auth::login($user);
        $user->token = $token;


        unset($user->created_at);
        unset($user->updated_at);
        unset($user->location_id);
        $user->inventory_id = $inventory_id;
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 200);
    }

    public function addCashier(Request $request)
    {
        $manager = Auth::user();

        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'image' => 'sometimes|image',
                'password' => 'required|string|min:8',
            ]);
        } catch (\Throwable $e) {
            return response()->json(["message" => 'validation failed']);
        }

        $cashier = new User;
        $cashier->username = $request->username;
        $cashier->email = $request->email;
        $cashier->company_name = $manager->company_name;
        $cashier->usertype_id = 2;
        $cashier->location_id = $manager->location_id;
        if (!is_null($request->file('image'))) {
            $image = $request->file('image');
            $file_name = time() . '_' . uniqid() . "_user_image." . $image->getClientOriginalExtension();
            $image->storeAs('public/profilePictures', $file_name);
            $cashier->pic_url = "profilePictures/" . $file_name;
        }
        $cashier->password = Hash::make($request->password);
        $cashier->save();

        $cashierRecord = new Cashier();
        $cashierRecord->company_id = $manager->id;
        $cashierRecord->cashier_id = $cashier->id;
        $cashierRecord->save();


        $mostRecentLogin = $cashierRecord->cashierLogins->max('created_at');
        $loginCount = $cashierRecord->cashierLogins->count();


        $responseCashier = [
            'username' => $cashier->username,
            'email' => $cashier->email,
            'pic_url' => $cashier->pic_url,
            'login_count' => $loginCount,
            'most_recent_login' => $mostRecentLogin,
            'created_at' => $cashier->created_at,
        ];

        return response()->json([
            'message' => 'Cashier created successfully',
            'cashier' => $responseCashier

        ], 200);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }

    public function refresh()
    {
        $token = Auth::refresh();
        $user = Auth::user();
        $user->token = $token;
        return response()->json([
            'message' => 'refreshed successfully',
            'user' => $user
        ], 200);
    }
}
