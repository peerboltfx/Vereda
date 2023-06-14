<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\subscribe;
use App\Models\flutterpay;
use App\Models\daily_plan;
use App\Models\Program;
use App\Models\batch;
use App\Models\UploadedCourse;
use App\Models\Profile;
use App\Models\Questions;
use App\Models\testReport;
use App\Models\assignment;
use App\Models\order_item;
use App\Models\liveSession;
use App\Models\Discount;







class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'role',
        'batch',
        'program',
        'code',
        'discount',
        "referral",
        "referred",
        'otp',
        "expires_at",
        "avatar"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function subscription(){
        return $this->hasOne(subscribe::class)->orderBy('created_at','ASC');
    }
    public function daily_plan(){
        return $this->hasMany(daily_plan::class)->orderBy('created_at','ASC');
    }
    public function programs(){
        return $this->hasMany(Program::class)->orderBy('created_at','ASC');
    }
    public function batch(){
        return $this->hasMany(batch::class)->orderBy('created_at','ASC');
    }
    public function UploadedCourse(){
        return $this->hasMany(UploadedCourse::class)->orderBy('created_at','ASC');
    }
    public function Profile(){
        return $this->hasOne(Profile::class)->orderBy('created_at','ASC');
    }
    public function Questions(){
        return $this->hasMany(Questions::class)->orderBy('created_at','ASC');
    }
    public function testReport(){
        return $this->hasMany(testReport::class)->orderBy('created_at','ASC');
    }
    public function assignment(){
        return $this->hasMany(assignment::class)->orderBy('created_at','ASC');
    }
    public function order_item(){
        return $this->hasMany(order_item::class)->orderBy('created_at','ASC');
    }
    public function liveSession(){
        return $this->hasMany(liveSession::class)->orderBy('created_at','ASC');
    }
    public function Discount(){
        return $this->hasMany(Discount::class)->orderBy("created_at","ASC");
    }
}
