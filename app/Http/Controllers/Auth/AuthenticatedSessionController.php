<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\OtpRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\User;
use App\Notifications\LoginNotification;
use Notification;



class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        
         
        $request->authenticate();
        
       
        $request->session()->regenerate();

            
        $user=User::where('email',$request->email)->get()->first();
       
         
        return redirect()->intended(RouteServiceProvider::HOME);
    }


    public function requestOtp(){
        $data=request()->all();
        $phone=$data["phoneNo"];
        $check=User::where('phone',$phone)->get()->last();
         if($check){
            $rand="1234567890";
            $generate=substr(str_shuffle($rand), 0 , 4);
            $now=now();
             $check->update([
                 "otp"=>$generate,
                 "expires_at"=>$now->addMinutes(2),
             ]);
            echo($generate);
             $api = urlencode('NzM2NzU3NDU3NjRmMzU2NjUzNmM3NDVhNzA0ZDc0MzU=');
	
             $sender="VEREDA";
             $number=$phone;
             $message = rawurlencode($generate.' is your one-time password (OTP) for phone verification to login at Vereda.'."\n".'Vereda.co.in');
           
             $data = array('apikey' => $api, 'numbers' =>$number, "sender" => $sender, "message" => $message);
           
             $ch= curl_init("https://api.textlocal.in/send/");
             curl_setopt($ch, CURLOPT_POST, true);
             curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
             curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $result = curl_exec($ch);
             if($result){
                return response("We have sent otp to your number, valid for 60 seconds" ,200)->header('content-type','text/plain');
              }
             else {
                return  response("error sending one-time-password" ,200)->header('content-type','text/plain');
                }
     }
       else {
        return response("number not registered, check for mistakes" ,200)->header('content-type','text/plain');

        }

       


    }


    public function confirmOtp(){
       $data=request()->all();
        $phone=$data["phone"];
        $otp=$data["otp"];

        $user=User::where(["phone"=>$phone,'otp' =>$otp])->get()->first();
        
        $now=now();
        if($user && $now->isBefore($user->expire_at)){ 
           
          $login =  Auth::login($user);
            $user->update([
                'otp'=>''
            ]);
            
            if($login){
               
        
        $notice="You successfully Logged in to you account. date : ".date('F d Y h:i:s',strtotime(date(now())));
            
            return redirect()->intended(RouteServiceProvider::HOME);
        }
        else{
            return back()->with('error',"the information you provide does not match, or token must have expired.");
        }

    }
}

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::user()->update([
            'otp'=>''
        ]);
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
