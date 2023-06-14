<?php

namespace App\Http\Controllers;

use App\Models\sendMail;
use App\Models\User;
use App\Http\Requests\StoresendMailRequest;
use App\Http\Requests\UpdatesendMailRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SendMailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mail(Request $request )
    {
       
    $data=$request->validate([
        'name'=>'required',
        'email'=>'required',
        'occupation'=>'required',
        'country'=>'required',
        'phone'=>'required',
        'language'=>'required',
        'state'=>'required',
        'studies'=>'',
        ]);

       

        $user=User::where('email','boltpeer@gmail.com');
       
    SendMail::create($data);
   
    Mail::to(auth()->user()->email)->send(new requestCall($data));
    Mail::to($data['email'])->send(new requestCall($data));



 return back()->with('message','seen');

       
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function viewCourse()
    {
        $program=DB::table('programs')->get();
        $batch=DB::table('batches')->where('options','open')->get();
        $fullstack=$batch->where("name","Full Stack Development Program")->last();
        $flutter=$batch->where("name","Flutter Development Program")->last();
      
        return Inertia::render('course',[
            'batch'=>$batch,
            'fullstack'=>$fullstack,
            'flutter'=>$flutter,
            "programs"=>$program
        ]);
    }

    public function newsForm()
    {
        Newsletter::create(request(['email']));
        return back()->with('message',"You have successfully subscribe to our newsletter");
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoresendMailRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoresendMailRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\sendMail  $sendMail
     * @return \Illuminate\Http\Response
     */
    public function show(sendMail $sendMail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\sendMail  $sendMail
     * @return \Illuminate\Http\Response
     */
    public function edit(sendMail $sendMail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatesendMailRequest  $request
     * @param  \App\Models\sendMail  $sendMail
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatesendMailRequest $request, sendMail $sendMail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\sendMail  $sendMail
     * @return \Illuminate\Http\Response
     */
    public function destroy(sendMail $sendMail)
    {
        //
    }
}
