<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'company_name',
        'usertype_id',
        'pic_url',
        'location_id',

    ];

    protected $hidden = [
        'password',
        
    ];

    protected $casts = [
        
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function usertype()
    {
        return $this->belongsTo(UserType::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class, 'company_id');
    }

    public function cashiers()
    {
        return $this->hasMany(Cashier::class);
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class, 'company_id');
    }

    public function donationDonators()
    {
    return $this->hasMany(Donation::class, 'donator_id');
    }

    public function donationReceivers()
    {
        return $this->hasMany(Donation::class, 'receiver_id');
    }

    public function charityRequests()
    {
        return $this->hasMany(CharityRequest::class, 'charity_id');
}
}
