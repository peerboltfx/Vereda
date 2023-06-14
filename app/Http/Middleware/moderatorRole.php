<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class moderatorRole
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
        if(empty(auth()->user()->role) || auth()->user()->role != "moderator"){
            return redirect("/error")->with('error','We couldnt find the page you are Looking for, please make sure you provided the correct link to the requested page.');
        }
        return $next($request);
    }
}
