<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Program;
use App\Models\subscribe;
use App\Http\Requests\StoreProfileRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\FlutterpayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DailyPlanController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\DB;
use App\Models\daily_plan;
use App\Models\Messages;
use App\Models\testReport;
use App\Models\batch;
use App\Models\order_item;
use App\Events\NotifyPlan;
use Inertia\Inertia;



class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auth=Program::all();
        $sub=subscribe::where('user_id',auth()->user()->id)->get();
        $profile=auth()->user()->Profile;
        $program=subscribe::where('user_id',auth()->user()->id);
       $programs=Program::all();
       $notification=auth()->user()->notifications->where("read_at",null)->all();
        return Inertia::render("Profiles",[
            "profile"=>$profile,
            "programs"=>$auth,
            "myprogram"=>$program,
            "program_links"=>$programs,
            "verified"=>$sub,
            "notification"=>$notification,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

       $data=request()->all();
      
       auth()->user()->Profile()->create([
        "firstname"=>$data["firstname"],
        "lastname"=>$data["lastname"],
        "gender" =>$data["gender"],
        "country"=>$data["country"],
        "role"=> "student",
        "program"=>$data["program"],
        "desire"=>$data["desire"],
        "birthDate"=>$data["birthDate"],
        "state"=>$data["state"],
        "address"=>$data["address"],
        "parentName"=>$data["parentName"],
       
       ]);

       auth()->user()->update([
        "role"=>"student"]);

        return redirect("/dashboard");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProfileRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProfileRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
            $program=DB::table('programs')->get();//Program Offered
            $passed=DB::table("test_reports")->where("decision","passed")->get(); //All passed Courses
            $passed2=DB::table("assignments")->where("decision","passed")->get(); //All passed Assignment
            $getFull=$program->where("program","Full Stack Development Program")->last()->random;// get Full Stack Dev Code
           $getFlutter=$program->where("program","Flutter Development Program")->last()->random; // Get Flutter Dev Code
           $getUserItems=$passed->where("user_id",auth()->user()->id);
           $getUserItems2=$passed2->where("user_id",auth()->user()->id);
            $fullstack=$getUserItems->where("program_code",$getFull);
            $flutter=$getUserItems->where("program_code",$getFlutter);
            $sub=subscribe::where('user_id',auth()->user()->id)->get();
            $notification=auth()->user()->notifications;
            
               if(!(auth()->user()->role)){
            return redirect('/application/edit-profile')->with(['programs'=> $program]);
            }
            else if( auth()->user()->role == "student"){
           
            $userBatch=DB::table("subscribes")->where(["user_id"=>auth()->user()->id])->get()->last();
             if($userBatch){
                $userBatch=$userBatch->batch;
             };
            
             $course=DB::table("daily_plans")->where("batch",$userBatch)->get()->take(5);
             
                return Inertia::render('Dashboard',[
                    'programs'=> $program,
                    'progress'=>$getUserItems,
                    "assignment"=>$getUserItems2,
                    "fullstack"=>$fullstack,
                    "flutter"=> $flutter,
                    "flutterLink"=>$getFlutter,
                    "fullstackLink"=>$getFull,
                    "course"=>$course,
                    "verified"=>$sub,
                    "notification"=>$notification,
                ]);
            }
            else if(auth()->user()->role =="admin"){
                return redirect('/en/Admin-dashboard');
            }
            else if(auth()->user()->role =="moderator"){
                
            $mod=daily_plan::where('user_id',auth()->user()->id)->get()->take(5);//Moderator get Scheduled Studies
            $checkClass=DB::table("batches")->where(['trainerid'=>auth()->user()->id])->get();//Moderator Classes
            $students=DB::table("subscribes")->where(['batch'=>$checkClass->first()->id])->get();
         
                return Inertia::render('Moderator/Dashboard',[ 'programs'=> $program,
                'progress'=>$getUserItems,
                "fullstack"=>$fullstack,
                "flutter"=> $flutter,
                "flutterLink"=>$getFlutter,
                "fullstackLink"=>$getFull,
                "course"=>$mod,
                "verified"=>$sub,
                "classModerator"=>$checkClass,
                "students"=>$students,
                "notification"=>$notification,
                ])
                ;
            }
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProfileRequest  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
       
        $data=request()->all();
        $now=now();
        
      if(auth()->user()->Profile){
        $imagepath=$data['avatar']->storeAs('jpg',$now."-".auth()->user()->id.".jpg","public");
        auth()->user()->Profile()->update([
        'firstname'=>$data['firstname'],
        'lastname'=>$data['lastname'],
        'birthDate'=>$data['birthDate'],
        'country'=>$data['country'],
        'desire'=>$data['desire'],
        'parentName'=>$data['ParentName'],
        'avatar'=>$now."-".auth()->user()->id.".jpg",
        'education'=>$data['education'],
        "phone"=>$data['phone'],
        'email'=>$data['email'],
        "gender"=>$data['gender'],
        "address"=>$data["address"],
        ]);
    }
    else{
        $imagepath=$data['avatar']->storeAs('jpg',$now."-".auth()->user()->id.".jpg","public");
        auth()->user()->Profile()->create([
            'firstname'=>$data['firstname'],
            'lastname'=>$data['lastname'],
            'birthDate'=>$data['birthDate'],
            'country'=>$data['country'],
            'desire'=>$data['desire'],
            'parentName'=>$data['ParentName'],
            'avatar'=>$now."-".auth()->user()->id.".jpg",
            'education'=>$data['education'],
            "phone"=>$data['phone'],
            'email'=>$data['email'],
            "gender"=>$data['gender'],
            "address"=>$data["address"],
            ]);
    }
    $project=[
        "user_id"=>auth()->user()->id,
        "name"=>auth()->user()->name,
        ];
      return back()->with('message',"success");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
