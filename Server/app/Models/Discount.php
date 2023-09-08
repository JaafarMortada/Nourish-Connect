<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'discounts_items')->withPivot('quantity');
    }
}
