<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CashierMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {   
        try{
            $user = Auth::user();
            if($user && $user->usertype_id == 2){
                return $next($request);
            }
        }
        catch(\Throwable $e){
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        return response()->json([
            'message' => 'Unauthorized',
        ], 401);
    }
}
