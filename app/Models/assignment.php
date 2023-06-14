<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class assignment extends Model
{
    use HasFactory;
    protected $fillable=[
        "answer",
        "question",
        "topic_id",
        "decision",
        "result"
    ];

    public function user(){
        $this->belongsTo(User::class);
    }
}
