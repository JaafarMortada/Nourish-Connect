<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashierLogin extends Model
{
    use HasFactory;

    protected $table = 'cashiers_logins';

    public function cashier()
    {
        return $this->belongsTo(Cashier::class);
    }
}
