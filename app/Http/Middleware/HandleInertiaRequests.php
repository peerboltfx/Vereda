<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Storage;
use App\Models\Profile;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        $auth="";
        $get=auth()->user();
        if($get){
            $profile=Profile::where('user_id',$get->id)->get()->last();
            if($profile){
               $auth=Profile::where('user_id',$get->id)->get()->last()->avatar;
            }
        }
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'avatar'=> $auth 
            ],
           'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error'=> fn () => $request->session()->get('error'),
                  'data' => fn () => $request->session()->get('data'),
                    'error:403'=> fn () => $request->session()->get('error:403'),
                'error:404'=> fn () => $request->session()->get('error:404')
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
