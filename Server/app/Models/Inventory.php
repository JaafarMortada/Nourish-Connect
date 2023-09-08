<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }
}
