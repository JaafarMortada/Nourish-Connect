<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cashier extends Model
{
    use HasFactory;

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function cashierLogins()
    {
        return $this->hasMany(CashierLogin::class);
    }
}
