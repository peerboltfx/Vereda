<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
class Questions extends Model
{
    protected $fillable=[
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "answer",
        "batch",
        "trainerid",
        "course",
    ];

    public function user(){
       return $this->belongsTo(User::class);
    }
    use HasFactory;
}
