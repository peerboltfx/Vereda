<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Program extends Model
{
    protected $fillable=[
        'program',
        'price',
        'inrprice',
        'period',
        'description',
        "random",
        "discount"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    use HasFactory;
}
