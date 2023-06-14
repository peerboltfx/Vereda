<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class daily_plan extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'topic',
        'decription',
        'sessiontype',
        'batch',
        'time',
        'program',
        'program_code',
        'assignment',
        "liveSession"
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
