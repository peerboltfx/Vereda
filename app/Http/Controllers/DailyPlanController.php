<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\daily_plan;
use App\Models\Program;
use App\Models\User;
use App\Models\Profile;
use App\Models\Questions;
use App\Models\UploadedCourse;
use App\Models\batch;
use App\Models\Assignment;
use App\Models\subscribe;
use App\Events\NotifyPlan;
use App\Http\Requests\Storedaily_planRequest;
use App\Http\Requests\Updatedaily_planRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Notifications\UserBatch;
use App\Models\liveSession;
use  Illuminate\Support\Facades\Storage;


class DailyPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $batch= batch::where('trainerid',auth()->user()->id)->get();
        $program=DB::table('programs')->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render('Moderator/Scheduler',[
            'program'=> $program,
            'batch'=>$batch,
            "notification"=>$notification
        ]);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
       $first= $request['first'];
       $second= $request['second'];
        $role=auth()->user()->role;
        $toprogram=Program::where('random',$first['programs_code'])->first()->program;
        $users=subscribe::where(["batch"=>$first['batch'], "program" => $toprogram])->get();
        $session="";
        $now=now();
        if($first['sessiontype'] == "book"){
            $session = "You have a class scheduled on ".date('F d Y',strtotime(date($first["date"]))).". Topic is ".$first["topic"];
       }
       elseif($first['sessiontype'] == "video"){
        $session = "You hav Live Session class scheduled on".date('F d Y',strtotime(date($first["date"]))).". Topic is ".$first["topic"];
       }
       elseif($first['sessiontype']== "test"){
        $session = "Quiz is scheduled to hold on <b>".date('F d Y',strtotime(date($first["date"])))."</b>";
       } 

       
        if( $role == 'moderator'){
            $save=auth()->user()->daily_plan()->create([
                'date' =>$first['date'],
                'batch' =>$first['batch'],
                'topic'=>$first['topic'],
                'program'=>$toprogram,
                'program_code'=>$first['programs_code'],
                'sessiontype'=>$first['sessiontype'],
                'decription'=>$second,
                'assignment'=>$first['assignment'],
            ]);
            if($users){
              foreach($users as $user){
                $owner=User::find($user->user_id);
                
                $message=[
                'name'=>$owner->name,
                'topic'=>$first['topic'],
                'program'=> $toprogram,
                'message'=>$session,
            ];
            $sender=auth()->user();
           $owner->notify(new UserBatch($message, $sender));

              }

            }
           
            return back()->with('message','schedule created Successfully');
        }
        else{
            return back()->with('error','You do not have the priviledge to take this action');
        }
    }

  public function deletePlan( $id){
    $user=daily_plan::find($id);
    $user->delete();
    return back()->with("message","successfully Deleted");
  }

  public function reuploadPlan($id) {
    $user=daily_plan::findOrFail($id);
    $data=UploadedCourse::where("course_id",$id)->get()->last();
  
    if($data){
        $data->delete();
    }
    $user->action='pending';
    $user->save();
    return back()->with("message","Course Ready for edit");
  }

    /**
     * View a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storedaily_planRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function view()
    {
        $data=daily_plan::all()->where('user_id',auth()->user()->id);
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        return Inertia::render("Moderator/PlanTable",[
            "plans"=>$data,
            "notification"=>$notification
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\daily_plan  $daily_plan
     * @return \Illuminate\Http\Response
     */
    public function createCourse($code, $id)
    {

        $schedule=daily_plan::where('id',$id)->first();
       $allbatch=batch::where('trainerid',auth()->user()->id)->get();
       $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        if($schedule==NULL){
             return redirect("/error")->with('error','We couldnt find the page you are Looking for, please make sure you provided the correct link to the requested page.');        
        }
        
        else{
            if($schedule->sessiontype == "test"){
                return Inertia::render("Moderator/setQuiz",
            [ "program"=> $schedule,
            "program_code"=>$code,
            "all_batch"=>$allbatch,
            "notification"=>$notification
            ]
            );
            }
            else{
            return Inertia::render("Moderator/CreateCourse",[
                "program"=> $schedule,
                "program_code"=>$code,
                "all_batch"=>$allbatch,
                "notification"=>$notification
            ]);
        }
    }
}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\daily_plan  $daily_plan
     * @return \Illuminate\Http\Response
     */
    public function creatingCourse($program,$id)
    {
        $check=daily_plan::where('id',$id)->get()->last();
        $exist=UploadedCourse::where("course_id",$id)->get()->last();
      
        $data=request();
       $first= $data['first'];
       $second= $data['second'];
       $type=$data['type'];
       $name=$first["filing"];
       $now=now()."-".$id.".pdf";
       
       if(!$exist){ 
        if($type =="book"){
            // Storage::disk("public")->put($now,$name, "pdf");
            // Storage::putFileAs("pdf",$name, $now);

          $saved=$first["filing"]->store("pdfs","public");
        auth()->user()->UploadedCourse()->create([
            "name"=>$saved,
            "batch"=>$first["batch"],
            "describe"=>$second,
            "course_id"=>$id,
        ]);
        
        }
        else if($type =="video")
        {
            if($first['filing']){
                $imagepath=$first['filing']->storeAs('video',$program.$id.".mp4","s3");
            };
           
            auth()->user()->UploadedCourse()->create([
            "name"=>$program.$id.".mp4",
            "batch"=>$first["batch"],
            "describe"=>$second,
            "course_id"=>$id,
            "liveSession"=>$first["Link"]
        ]);
        $check->update([
            "liveSession" => $first["Link"]
        ]);
        }
    }
    else{
        if($type =="book"){
            
            // $saved=$first["filing"]->store("pdfs","public");
            Storage::putFileAs("image",$first["image"], $now);
            // Storage::disk("public")->put($now,$name, "pdf");
           
            $exist->update([
                "name"=>$saved,
                "batch"=>$first["batch"],
                "describe"=>$second,
                "course_id"=>$id,
            ]);
           
            }
            else if($type =="video")
            {  
                $exist->update([
                "name"=>$program.$id.".mp4",
                "batch"=>$first["batch"],
                "describe"=>$second,
                "course_id"=>$id,
            ]);

         
           ;
            $check->liveSession = $first["Link"];
                    $check->save();
            }
    }
       return back()->with("success","successfully Created");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatedaily_planRequest  $request
     * @param  \App\Models\daily_plan  $daily_plan
     * @return \Illuminate\Http\Response
     */
    public function addQuestions($topic, $id)
    {
        $datas=request();
        $batchInfo=$datas["batchInfo"];
        $data=$datas["data"];
       /** $getBatch = batch::where("id",$id);*/ 
    
        auth()->user()->Questions()->create([
            "question"=>$data["question"],
            "option1"=>$data["option1"],
            "option2"=>$data["option2"],
            "option3"=>$data["option3"],
            "option4"=>$data["option4"],
            "answer"=>$data["answer"],
            "batch"=>$batchInfo["id"],
            "trainerid"=>$batchInfo["trainer"],
            "course"=>$batchInfo["course"],
        ]);
        return back()->with("message", "question Added");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\daily_plan  $daily_plan
     * @return \Illuminate\Http\Response
     */
    public function readyquestion($id){
        $course= daily_plan::where("id",$id);
        $course->update([
            "action"=>"created",
        ]);
        return back()->with("message", "ready to begin quiz");
    }

    public function Assigmentview()
    {
        
        $assignment=daily_plan::where(["user_id"=>auth()->user()->id, 'assignment' => false])->get()->all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        return Inertia::render("Moderator/Assignment",["assignments"=>$assignment]);
    }

    public function AssignmentViewID($id){
        $data=Assignment::where("topic_id",$id)->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        return Inertia::render("Moderator/ViewAssignment",[
            "assignments"=>$data,
            "notification"=>$notification
            ]);
    }

    public function assignmentUpdate($id){
    
        $assign=Assignment::where("id",$id)->get()->last();
        $decision="pass";
        $data=request();
        $datas=$data["score"];
        if($datas < 6){
            $decision ="fail";
        };
       
        $assign->update([
            "result"=>$datas,
            "decision"=>$decision
        ]);
        return back()->with("message","Student has been graded successfully");
        
    }

    public function ModeratorsStudents(){
        $students=batch::where('trainerId',auth()->user()->id)->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all();
        $currentClass=daily_plan::where(["action"=>"created" ])->get()->last();
        $liveClass=liveSession::where(["batch"=>$currentClass->batch,"topicId"=>$currentClass->id,"attendace"=>"pending"])->get();
        $sub=subscribe::where("batch",$currentClass->batch)->get();
     
        return Inertia::render("Moderator/HandlingBatch",[
        "notification"=>$notification,
        "students"=>$students,
        "current_class"=>[
        "topic"=>$currentClass,
        "student"=>$liveClass
        ],
       ]);
    }

    public function ModeratorClass($id){
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        $students=subscribe::where("batch",$id)->get();
       
        return Inertia::render("Moderator/MyStudents",[
            "notification"=>$notification,
            "students"=>$students->each->user,
        ]);
        
    }

    public function ModeratorQuiz(){
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        $quiz=daily_plan::where("sessiontype","test")->get();
        return Inertia::render("Moderator/Questions",[
            "notification"=>$notification,
            "quiz"=>$quiz
            ]);
    }

    public function viewQUestions( $id){
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        $origin=daily_plan::where("id",$id)->get();
        $question=Questions::where("course",$id)->get();
        return Inertia::render("Moderator/allQuestions",[
            "questions"=>$question,
            "notification"=>$notification,
            "origin"=>$origin
        ]); 
    }

    public function deleteQuestion($id){
        $question=Questions::find($id);
        $question->delete();
        return back()->with("message","Question was successfully removed from the list.");
    }
}
