<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class liveSession extends Model
{
    use HasFactory;
    protected $fillable=[
        "TopicId",
        "TopicName",
        "batch",
        "joined",
        "finished",
        "attendace",
        "name",
        "avatar"
    ];
    public function user(){
        return $this->belongsTo(User::class);
      }
}
