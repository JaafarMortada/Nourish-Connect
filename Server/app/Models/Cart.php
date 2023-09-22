<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'carts_items')->withPivot('quantity', 'created_at');
    }


}
