<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UploadedCourse extends Model
{
    use HasFactory;
    protected $fillable= [
        "name",
        "batch",
        "course_id",
        "describe",
        "action"
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
