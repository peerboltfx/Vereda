<?php

namespace App\Models;
use App\Models\User;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable=[
        "firstname",
        "lastname",
        "gender",
        "birthDate",
        "country",
        "program",
        "desire",
        "role",
        "education",
        "email",
        "avatar",
        "parentName",
        "address",
        "state"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }


    use HasFactory;
}
