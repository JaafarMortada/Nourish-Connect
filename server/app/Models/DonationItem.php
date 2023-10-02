<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationItem extends Model
{
    use HasFactory;
    
    protected $table = 'donations_items';

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function donation()
    {
        return $this->belongsTo(Donation::class);
    }
}
