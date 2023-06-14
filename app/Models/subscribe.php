<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subscribe extends Model
{

    protected $fillable = [
        'name',
        'payment_id',
        'razorpay_id',
        'payment_done',
        'program',
        'batch',
        "recure",
        "method",
        'expires_at',
        'amount'
    ];

    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class);
    }
}
