<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OTP;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Http\Requests\OtpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Notifications\registerNotification;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        if(request(["otp"])){

        return Inertia::render('Auth/Register');
        }
        else{
            return Inertia::render("Auth/getotp");
        }
    }

    public function viewsignup(){
        $data=request()->all();
        $phone=$data["phone"];

        $rule=User::where("phone",$phone)->get()->first();

        if(!$rule){
            $rand="1234567890";
            $generate=substr(str_shuffle($rand), 0 , 4);
            $now=now();
            $check=OTP::create([
                "otp"=>$generate,
                "expires_at"=>$now->addMinutes(2),
                "phone"=>$phone
            ]);
            
            
            $api = urlencode('NzM2NzU3NDU3NjRmMzU2NjUzNmM3NDVhNzA0ZDc0MzU=');
	
            $sender="VEREDA";
            $number='91'.$phone;
            $message = rawurlencode($generate.' is your one-time password (OTP) for phone verification to login at Vereda.'."\n".'Vereda.co.in');
          
            $data = array('apikey' => $api, 'numbers' =>$number, "sender" => $sender, "message" => $message);
          
            $ch= curl_init("https://api.textlocal.in/send/");
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

           $result = curl_exec($ch);
            if($result){
               return response("We have sent otp to your number, valid for 2 minutes" ,200)->header('content-type','text/plain');
            
            }
            else {
               return  response("error sending mail" ,200)->header('content-type','text/plain');
               }
        }
        else{
            return response("Someone has already registered with this number" ,200)->header('content-type','text/plain');

        }
    }


    public function OTPVerify(){
        $data=request()->all();
        $phone=$data["phone"];
        $otp=$data["otp"];

        $user=OTP::where(["phone"=>$phone,'otp' =>$otp])->get()->first();
        
        $now=now();
        if($user && $now->isBefore($user->expire_at)){ 
            return Inertia::render('Auth/Register',[
                'phone'=>$phone,
            ]);
        }
        else{
            return back()->with('error',"the information you provide does not match, or token must have expired.");
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
      $data=  $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'referred'=>'string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'referred'=>$request->referred,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        
       $message=[
           "message"=>"You have succesfully registered your account"
           ];

        Auth::login($user);
         auth()->user()->notify(new registerNotification($message));

        return redirect(RouteServiceProvider::HOME);
    }
}
