<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HandleInertia extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request),[
            
            //Synchronously
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'referral' => fn() => $request->session()->get('referral'),
            ],
        ]);
    }
}
