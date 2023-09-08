<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'discounts_items')->withPivot('quantity');
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'carts_items')->withPivot('quantity');
    }

    public function donationItems()
{
    return $this->hasMany(DonationItem::class, 'item_id');
}

}
