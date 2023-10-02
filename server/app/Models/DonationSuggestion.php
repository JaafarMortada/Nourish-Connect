<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationSuggestion extends Model
{
    use HasFactory;

    protected $table = 'donations_suggestions';

    protected $fillable = [
        'item_id',
        'charity_id',
        'quantity',
        'request_id',
        
    ];

    public function charities()
    {
        return $this->belongsToMany(User::class, 'donations_suggestions', 'item_id', 'charity_id')
            ->withPivot('id', 'quantity', 'approved')
            ->withTimestamps();
    }

    public function toRequest()
    {
        return $this->belongsTo(CharityRequest::class, 'request_id');
    }

    public function hasItem()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
