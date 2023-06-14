<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order_item extends Model
{
    use HasFactory;
    protected $fillable=[
        "orderId",
        "razorpayId",
        "amount",
        "currency",
        "name",
        "receipt",
        "action",
        "program",
        "recure",
        "method",
        'expires_at',
    ];
    public function user(){
      return $this->belongsTo(User::class);
    }
}
