<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountSuggestion extends Model
{
    use HasFactory;

    protected $table = 'discounts_suggestions';

    protected $fillable = [
        'item_id',
        'percentage',
        'until',

    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
