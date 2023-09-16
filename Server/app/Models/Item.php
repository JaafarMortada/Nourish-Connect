<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'original_price',
        'initial_quantity',
        'available_quantity',
        'pic_url',
        'production_date',
        'expiry_date',
        'category',
        'barcode',
        'inventory_id',

    ];

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
