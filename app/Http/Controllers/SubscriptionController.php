<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\subscribe;
use App\Models\liveSession;
use App\Models\daily_plan;
use App\Models\batch;
use App\Models\UploadedCourse;
use App\Models\order_item;
use App\Models\Program;
use App\Models\Assignment;
use App\Models\testReport;
use App\Models\Questions;
use App\Http\Requests\StoresubscriptionRequest;
use App\Http\Requests\UpdatesubscriptionRequest;
use Inertia\Inertia;
use Razorpay\Api\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Storage;
use Illuminate\Support\Str;
use Pusher\Pusher;


use Session;
use Redirect;
class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($session , $link)
    {   
        $data=explode("-", $session);
        $implode=implode(" ",$data);
        $get=DB::table('programs')->where('program',$implode)->get();
        $getBatch=auth()->user()->batch();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
      
        $get2=DB::table('programs')->where('program',$implode)->first()->random;
        $subsc=subscribe::where(['program'=> $implode, "user_id"=>auth()->user()->id])->get()->last()->batch;
        $recursive=subscribe::where(['program'=> $implode, "user_id"=>auth()->user()->id])->get()->first();
        $expire="";
       if(now()->isBefore($recursive->expires_at)){
        $expire="false";
       }
       else{
        $expire="true";
        
       }

       $order=order_item::where(["user_id"=>auth()->user()->id,"program"=>$recursive->program, "action"=>"pending"])->get()->last();

      
       
        $subBatch=batch::where('id', $subsc)->get()->last();
$progress=testReport::where([
            'user_id'=>auth()->user()->id,'decision'=>'passed'])->get()->count();
          
     
    $plans=DB::table('daily_plans')->where(['program_code'=>$get2,'batch'=>$subsc])->get(); 
    $batch=$plans;
         $sub=subscribe::where('user_id',auth()->user()->id)->get();
        
      if($get2 === $link){
        return Inertia::render('FullStackSession',[
            'plans'=>  $batch,
            'program'=>$get,
            "name"=>$implode,
            "progress"=>$progress,
            'programs'=>$batch,
            "batch"=>$subBatch,
            'verified'=>$sub,
            "notification"=>$notification,
            "expires"=>$expire,
            "subscription"=>$recursive,
            "order"=>$order
          ]);
      }
      else{
        return Inertia::render('ErrorPage',[
            'errors'=>'Error 404: Page Not Found',
            'errorCode'=>'404',
            "notification"=>$notification

        ]);
      }
    }

   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function payment(Request $request)
    {        

        $input = $request->all();  
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
  
        $payment = $api->payment->fetch($input['razorpay_payment_id']);
  
        if(count($input)  && !empty($input['razorpay_payment_id'])) {
            try {
                $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount'=>$payment['amount'])); 
  
            } catch (Exception $e) {
                return  $e->getMessage();
                Session::put('error',$e->getMessage());
                return redirect()->back();
            }
        }
        $batch=DB::table('batches')->where('name',$input['program'])->get();
        $option=$batch->where("options","open")->last();
      
      $success=auth()->user()->subscription()->create([
            'name'=> auth()->user()->name,
            'payment_id'=>'verified',
            'program'=>$input['program'],
            'razorpay_id'=>$input['razorpay_payment_id'],
            'payment_done'=>'true',
            'batch'=>$option->id
        ]);
        if($success){
            if(auth()->user()->batch == NULL){
                auth()->user()->update([
                    "batch"=>$option->id,
                ]); 
            }
         else{
                auth()->user()->update([
                        "batch2"=>$option->id,
                    ]);
                }
        }
        $user=auth()->user()->subscription;
        
        
        return view('successful')
        ->with(['success'=>$input['razorpay_payment_id'],
            'date'=>$user->created_at->diffForHumans() ]);
    }

    public function subscribing(Request $request){
        $receiptId=Str::random(20);
        
        $endtime=now()->addMonth($request->all()['data_recursive']);
        
        $api = new Api(env("RAYZOR_KEY_ID"), env("SECRET_KEY_RAZOR"));

        $discount=0;
       
        if($request->data_discount){
            $discount=DB::table("discounts")->where("discount_code",$request->data_discount)->get()->last()->amount;
            
        }

        $order = $api->order->create(array(
            'receipt' => $receiptId,
            'amount' => ($request->all()['data_amount'] - $discount) * 100,
            'currency' => 'INR'
        )
         );

    // Let's checkout payment page is it working
    $response = [
        'orderId' => $order['id'],
        'razorpayId' => env("RAYZOR_KEY_ID"),
        'amount' => ($request->data_amount - $discount) * 100,
        'name' => auth()->user()->name,
        'currency' => 'INR',
        'description' => '',
        "receipt"=>$receiptId
        ];
        
        auth()->user()->order_item()->create([
            'orderId' => $order['id'],
            'razorpayId' => env("RAYZOR_KEY_ID"),
            'amount' => ($request->data_amount - $discount),
            'name' => auth()->user()->name,
            'currency' => 'INR',
            'program' => $request->data_describe,
            'receipt'=>$receiptId,
            'action'=>"pending",
            'recure'=>$request->data_recursive,
            'method'=>$request->data_method,

        ]);

        return back()->with([
        'orderId' => $order['id'],
        'razorpayId' => env("RAYZOR_KEY_ID"),
        'amount' => $request->data_amount * 100,
        'name' => auth()->user()->name,
        'currency' => 'INR',
        'description' => $request->data_describe,
        'dev'=> $request->data_describe,
        'price'=>$request->data_price,
        'recure'=>$request->data_recursive,
        'method'=>$request->data_method,
        ]);
    }


    public function CancelOrder($order){
        $api = new Api(env("RAYZOR_KEY_ID"), env("SECRET_KEY_RAZOR"));

        $data=DB::table("order_items")->where('orderId',$order)->get()->last();
        $merge=order_item::find($data->id);
        
        $merge->delete();
       return response($data->id,200)->header('content-type','text/plain');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoresubscriptionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function studies($code, $id)
    {
        $studies=DB::table("uploaded_courses")->where("course_id",$id)->get()->last();
        $origin=DB::table("daily_plans")->where("id",$id)->get()->last();
        $session=liveSession::where(["TopicId"=>$id, "user_id"=>auth()->user()->id])->get();
        
       
        $sessionLive="";

        if($session){
            $sessionLive=$session;
        }
        
       
        $checkpaid=subscribe::where('user_id',auth()->user()->id)->get();
        $allProgram=$getProgram=DB::table('programs')->get();
        $getProgram=DB::table('programs')->where('random',$code)->get()->last()->program;
        $compare= $checkpaid->where("program",$getProgram);
        $find=daily_plan::where('id',$id)->get()->last();
        $sub=subscribe::where('user_id',auth()->user()->id)->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        $recursive=subscribe::where(['program'=> $getProgram, "user_id"=>auth()->user()->id])->get()->first();
        
        $expire="";
       if(now()->isBefore($recursive->expires_at)){
        $expire="false";
       }
       else{
        $expire="true";
        
       }

       $order=order_item::where(["user_id"=>auth()->user()->id,"program"=>$recursive->program, "action"=>"pending"])->get()->last();

     
      if($compare){
        if($studies != null){
            if($find->sessiontype == "book"){

               $url=response()->url("storage/".$studies->name);
            return Inertia::render('Studies',[
                "studies"=>$studies,
                "origin"=>$origin,
                "programs"=> $allProgram,
                'compact'=>$studies->name,
                'type'=>$find->sessiontype,
                "verified"=>$sub,
                "notification"=>$notification,
                "expires"=>$expire,
            "subscription"=>$recursive,
            "order"=>$order
            ]);
        }
        elseif($find->sessiontype ==="video"){
           
            $url=Storage::disk('s3')->temporaryUrl('video/'.$studies->name,now()->addMinutes(70));
            return Inertia::render('Studies',[
               
                "studies"=>$studies,
                "origin"=>$origin,
                "programs"=> $allProgram,
                'compact'=>$url,
                'type'=>$find->sessiontype,
                "verified"=>$sub,
                "notification"=>$notification,
                "sessionLive"=>$sessionLive->first(),
                "expires"=>$expire,
            "subscription"=>$recursive,
            "order"=>$order

            ]);
        }

        }
        else{
          
            return Inertia::render('Studies',[
            
                "studies"=>$studies,
                "origin"=>$origin,
                "programs"=> $allProgram,
                "verified"=>$sub,
                "notification"=>$notification,
                "sessionLive"=>$sessionLive->first(),
                "expires"=>$expire,
            "subscription"=>$recursive,
            "order"=>$order
            ]);
        }
        }
        else{
            return redirect("/error")->with("error","you do not have access till make necessary payments.");
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function startQuiz($origin, $course)
    {
        $explodeCourse=explode('-',$course);
        $implode=implode(' ',$explodeCourse);
        $quiz=Questions::where("course",$origin)->get();
        $getCourse=daily_plan::where("id", $origin)->get()->last();
        $getUser=testReport::where(['user_id'=>auth()->user()->id, 'courseid'=>$origin])->get()->last();
        $action=$getCourse->action;
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        if($action == "created"){
        if(empty($getUser->id)){
            auth()->user()->testReport()->create([
                "name"=>auth()->user()->name,
                "courseid"=>$origin,
                "course"=>$course,
                "batch" => $getCourse->batch,
                "program_code"=>$getCourse->program_code,

            ]);
            return Inertia::render("Students/Quiz",[
                "questions"=>$quiz,
                "notification"=>$notification

            ]);
       }
       else{
    
       return Inertia::render("Students/Quiz",[
        "questions"=>$quiz,
        "notification"=>$notification
    ]);
       }
    }
    else{
        return back()->with('error','Quiz is closed!.');
    }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function saveQuiz()
    {
        $data=request()->all();
        
        $decision="";
        if($data['data'] < 60 ){
            $decision="failed";
        }
        else{
            $decision="passed";
        }
        $getCourse=testReport::where('courseid',$data["identity"])->get()->last();
        $course=daily_plan::where('id',$data["identity"])->get()->last()->action;
        if($course == "created"){

            $getCourse->update(["result"=>$data["data"],"decision"=>$decision]);
        return back()->with('message','click Next to Continue');
    }
        else{
            $getCourse->update(["result"=>$data["data"],"decision"=>$decision]);
            return back()->with('message','click Next to Continue');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatesubscriptionRequest  $request
     * @param  \App\Models\subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function studentReport()
    {
        $data=auth()->user()->testReport;
        $prograam=Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        $sub=subscribe::where('user_id',auth()->user()->id)->get();
       return Inertia::render("Students/Report",[
        "report"=>$data,
        "verified"=>$sub,
        "programs"=>$prograam,
        "notification"=>$notification

       ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function Assignment()
    {
        $data=request();
       
        $assignment=Assignment::where(['topic_id'=>$data['topic_id'],'user_id'=>auth()->user()->id])->get()->last();
        $imagepath=$data['answer']->storeAs('pdf',$data['topic_id'].auth()->user()->id.".pdf","public");
        if( $assignment){
            $assignment->update([
                "question"=>$data["question"],
                "answer"=>$data['topic_id'].auth()->user()->id.".pdf",
                "topic_id"=>$data["topic_id"],
                ]);
        }
        else{
            auth()->user()->assignment()->create([
                "question"=>$data["question"],
                "answer"=>$data['topic_id'].auth()->user()->id.".pdf",
                "topic_id"=>$data["topic_id"],
                ]);    
        }
         return back()->with("message","You have submitted Your Answer. Please note that submitted assgnments are likely going to take 2-5 days checking and scoring");
    }

    public function viewAssignment(){
        $prograam=Program::all();
        $assignment=auth()->user()->assignment;
        $sub=subscribe::where('user_id',auth()->user()->id)->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render("Students/Assignment",[
            "assignment"=>$assignment,
            "verified"=>$sub,
            "programs"=>$prograam,
            "notification"=>$notification
            ]);
    }

    public function ReferralPage(){
        $prograam=Program::all();
        $ref=auth()->user()->referral;
        $referred=auth()->user()->referred;
       $referral="";
       $notification=auth()->user()->notifications->where("read_at",null)->all(); 

       if($referred){
        $referral=User::where('referral',$referred)->get()->last()->name;
    }
        $sub=subscribe::where('user_id',auth()->user()->id)->get();
        $refs=[];
        if($ref){
            $refs=User::where("referred",$ref)->get();
        }
        return Inertia::render("Students/Referral",[
            "verified" => $sub,
            "programs"=>$prograam,
            "referral"=>$ref,
            "allReferrals"=>$refs,
            'referred'=> $referral,
            "notification"=>$notification
        ]);
    }
    public function GenerateReferral(){
        $user=auth()->user()->name;
        $explode=explode(" ",$user);
        $implode=implode("_",$explode);

        $rand="ABCDEFGHIJKLMMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
        $sub=substr(str_shuffle($rand), 0 , 6);
        $code=$implode."_".$sub;

       
        auth()->user()->update(["referral"=>$code]);
        return back()->with("message","created");
    }

    public function Transactions(){
        $transaction=order_item::where("user_id",auth()->user()->id)->get();
        $prograam=Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 

        $sub=subscribe::where('user_id',auth()->user()->id)->get();
        return Inertia::render("Students/Transaction",[
            "programs"=>$prograam,
            "verified" => $sub,
            "transactions"=>$transaction,
            "notification"=>$notification
        ]);
    }

    public function LiveSession(Request $request){
        $socketId=$request->socket_id;
        $channel_name=$request->channel_name;

        $pusher=new Pusher(env("PUSHER_APP_ID"),env("PUSHER_APP_SECRET"),[
            "cluster"=>env("PUSHER_APP_CLUSTER"),
            "encrypted"=>true,
        ]);

        $presence_data=["name"=> auth()->user()->name];
        $key= $pusher->presence_auth($channel_name, $socketId, auth()->id,$presence_data);
        return response($key);
    }

    public function markAttendance(){
        $data=request()->all();
        $firstname=auth()->user()->Profile->firstname;
        $lastname=auth()->user()->Profile->lastname;
        $save=auth()->user()->liveSession()->create([
            "TopicId"=>$data["courseId"],
            "TopicName"=>$data["courseName"],
            "batch"=>$data["batch"],
            "joined"=>now(),
            "finished"=> "",
            "attendace"=>"pending",
            "name"=>$firstname." ".$lastname,
        ]);
        if( $save){
            return back();

        }
        else{
            return back();

        }

    }
}