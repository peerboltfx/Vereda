<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use \App\Models\User;
use \App\Models\subscribe;
use Illuminate\Support\Facades\DB;


class EnsurePaymentValid
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
            return redirect("payment/{$implode}");
        };

        return $next($request);
    }
}
