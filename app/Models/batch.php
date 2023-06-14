<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class batch extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'options',
        'starts',
        'ends',
        'trainerid',
        'trainerName',
        'studentsno',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
