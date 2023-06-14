<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class flutterpay extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'payment_id',
        'razorpay_id',
        'payment_done',
        'program',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
