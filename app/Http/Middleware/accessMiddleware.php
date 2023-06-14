<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\subscribe;


class accessMiddleware
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
       
        $program=Program::where("random",$request->code)->get()->first();
        
        $user=subscribe::where(["user_id"=>auth()->user()->id,"program"=>$program->program])->get()->first();
       if(!$user){
        return redirect("payment/{$request->program}");       
    }
    else{
        return $next($request);
    }
    }
}
