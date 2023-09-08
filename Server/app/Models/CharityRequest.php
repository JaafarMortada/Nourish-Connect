<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharityRequest extends Model
{
    use HasFactory;

    public function requestedBy()
    {
        return $this->belongsTo(User::class, 'charity_id');
    }

}
