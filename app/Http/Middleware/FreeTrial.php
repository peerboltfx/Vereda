<?php

namespace App\Http\Middleware;
use \App\Models\User;
use \App\Models\subscribe;
use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Http\Request;

class FreeTrial
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $session=$request->session;
        $data=explode("-", $session);
        $implode=implode(" ",$data);

        $user=auth()->user()->id;
        $sub=subscribe::where('program',$implode)->get()->last();
        
        $verify=subscribe::where('user_id',$user)->get()->last();
        if( !($verify) || !($sub) || $sub->program != $implode ){
            return redirect("trial-attempt/{$implode}");
        };
        return $next($request);
    }
}
