<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $table = 'donations';

    public function donator()
    {
        return $this->belongsTo(User::class, 'donator_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function donationItems()
    {
        return $this->hasMany(DonationItem::class, 'donation_id');
    }
}
