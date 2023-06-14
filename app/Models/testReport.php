<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class testReport extends Model
{
    use HasFactory;
    protected $fillable = [
        "courseid",
        "course",
        "result",
        "name",
        "batch",
        "trials",
        "decision",
        "program_code"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
