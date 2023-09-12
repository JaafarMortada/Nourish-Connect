<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CharityRequest extends Model
{
    use HasFactory;

    protected $table = 'charities_requests';

    public function requestedBy()
    {
        return $this->belongsTo(User::class);
    }

}
