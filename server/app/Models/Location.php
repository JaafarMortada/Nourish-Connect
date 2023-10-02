<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'latitude',
        'longitude',
        
    ];

    public function users(){
        return $this->hasMany(User::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
