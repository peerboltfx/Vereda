<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\batch;
use App\Models\Program;
use App\Models\User;
use App\Models\order_item;
use App\Models\Messages;
use App\Models\subscribe;
use App\Models\UploadedCourse;
use App\Models\sendMail;
use App\Models\Discount;
use App\Mail\SendDiscountCode;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AdminController extends Controller
{
     /**Here we query all user privileged as Moderator and render
     * a view in our jsx file for our administrator to preview 
     */
    
    public function view(){
        $users= User::all()->where('role','moderator');
        
        $db= DB::table('users')->where('role','moderator')->get();
        $programs=Program::all(); 
        $notification=auth()->user()->notifications->where("read_at",null)->all();
        return Inertia::render('Admin/moderator', [
            'moderators'=> $db,
            'programs'=> $programs,
            "notification"=>$notification
    ]);
    }
    /**
     * Here we preview Moderator Individually from The Moderator
     * table ready to modify roles. ps: Only roles can be modified
     * here for concern over security and privacy.
     */
    public function editModerator($user){
        $users=DB::table('users')->where('id',$user)->get();
        $programs=Program::all(); 
        $notification=auth()->user()->notifications->where("read_at",null)->all();
        return Inertia::render('Admin/moderatorEdit',[
            'moderator'=>$users,
            'programs'=> $programs,
            "notification"=>$notification
    ]);

    }
    /**
     * Here is a request from admin After submitting/posting modified information
     * from the moderator.
     */
    public function editting($user){
        $data=request()->all();
        $generator;
        $user=User::find($user);
        if($data['amount']){
            $rand="ABCDEFGHIJKLMMNOPQRSTUVWXYZ1234567890";
            $generator=substr(str_shuffle($rand), 0 , 7);

            $user->update([
                'code'=> $generator,
                'discount'=>$data['amount']
               ]);
               Mail::to($user->email)->send(new SendDiscountCode($data));

        }
        elseif($data['roles']){
            $user->update([
                'role'=>$data['roles'],
               ]);
        }
       
       
       
       return back();
    }

    /**This function preview the A table for all Users Including Moderators */
    public function Allusers(){
        $auth= User::all();
        $programs=Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render('Admin/Users',[
            'Using' =>$auth,
            'programs'=> $programs,
            "notification"=>$notification
        ]);
    }
/**This function preview the A table for all Users Including That are only Students */
    public function AllStudents(){
        $users=DB::table('users')->where('role','student')->get();
        $programs=Program::all(); 
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render('Students', [
            'students'=>$users,
            'programs'=> $programs,
            "notification"=>$notification

        ]);
    }

    /**Here we edit already created batch and update it in the database*/
    public function editBatch($user){
       $req= request()->all();
       $users=User::find($user);
       $users->update(["batch"=> $req["batch"]]);
       return back()->with('success','successfully Update');
    }

/**Here contains Functions for processing 
 * program, This function render a view page only if it is preiviewed by Administrator 
 */
  public function createView(){
        $program =Program::all();
        $batch=batch::all();
        $moderators=User::where('role','moderator')->get();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render('Admin/Program',[
            "programs" => $program,
            "batch"=>$batch,
            "moderator"=>$moderators,
            "notification"=>$notification
        ]);
    }

    /**Here is a post request from the admin to create program */
    public function createNewprogram(Request $request){
        $first=$request['first'];
        $second = $request['second'];
        $rand="ABCDEFGHIJKLMMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
        $sub=substr(str_shuffle($rand), 0 , 100);
        auth()->user()->programs()->create([
            "program"=>$first['program'],
            "price"=>$first['price'],
            "inrprice"=>$first["inrprice"],
            "period"=>$first["period"],
            "description"=>$second,
            "random" =>$sub,
        ]);

        return back()->with('success',"successfully Created a new Program"); 
    }

    /** Here we view an already created program for modification */
    public function editProgram($id){

        $program= Program::where("random",$id)->first();
        $programs= Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render("Admin/editProgram",
    ["program"=>$program,
     "programs"=>$programs,
     "notification"=>$notification

    ]
    );
    }
    /**Here we have post request from admin for program modifcation to update */
   public function updateProgram($id){
    $program= Program::where("random",$id)->first();
    $data=request();
    $data1=$data["first"];
    $data2=$data["second"];
   
    $program->update([
        "program"=>$data1['program'],
        "price"=>$data1['price'],
        "inrprice"=>$data1["inrprice"],
        "period"=>$data1["period"],
        "description"=>$data2,
        "discount"=>$data1["discount"]
    ]);
    return redirect("/admin/create-program");
   }

    public function createBatch(){
       $data=request()->all();

       $time=explode("-",$data["starts"]);
       $shuffleTime= $time[1]."-".$time[2]."-".$time[0];

       $end=explode("-",$data["ends"]);
       $shuffleTimeEnd= $end[1]."-".$end[2]."-".$end[0];
       
       $trainer=User::findOrFail($data["trainer"]);
       auth()->user()->batch()->create([
        "name"=>$data["name"],
        "options"=>"close",
        "starts"=>$shuffleTime,
        "ends"=>$shuffleTimeEnd,
        "trainerid"=>$data["trainer"],
        "trainerName"=>$trainer->name,
       ]);
      return back()->with("message","succefully created New  Batch");  
    }

    public function updateBatch($id){
        $batch=batch::where('id',$id)->first();
        if($batch->options == "open"){
            $batch->update([
                "options"=>"close",
            ]);

            return back()->with("success","success");
        }
        else{
            $batch->update([
                "options"=>"open",
            ]);
            return back()->with("success","success");
        }   
    }
    /**Here we delete a batch */

    public function deleteBatch($id){
        $batch=batch::where('id',$id)->first();
        $batch->delete($batch);
        return back()->with("success","updated successfully");
    }


    public function AdminDashboard(){
        $program=Program::all();
        $user=User::all();
        $Admin=User::all()->where('role','admin');
        $moderators=User::all()->where('role','moderator');
        $students=User::all()->where('role','student');
        $noRole=User::all()->where('role', NULL);
        $allbatch= batch::all();
        $subscribers=subscribe::all();
        $mod=UploadedCourse::all()->take(5);//Admin get Uploaded Course Studies
        $calls=sendMail::all()->take(5);
        $message=Messages::all()->take(5);
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 


        return Inertia::render('Admin/Dashboard',[
            'programs'=>$program,
            'users'=> ["user"=>$user, 'admin'=> $Admin->count(),'moderator'=>$moderators->count(),"students"=>$students->count(),"optionl_students"=>$noRole->count()],
            'batch'=>$allbatch,
            'subscribe'=>$subscribers,
            'course'=>$mod,
            "calls"=>$calls,
            "message"=>$message,
            "notification"=>$notification

        ]);
    }


    public function createCourse(){
        $program=Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        return Inertia::render('Admin/createCourse',[
            'programs' => $program,
            "notification"=>$notification

        ]);
    }
    public function OrderItems(){
    $program=Program::all();
    $orderItems=order_item::all();
    $notification=auth()->user()->notifications->where("read_at",null)->all(); 
    return Inertia::render("Admin/order",[
        "programs"=>$program,
        "orders"=>$orderItems,
        "notification"=>$notification
    ]);
    }

    public function PaidUser(){
        $program=Program::all();
        $subscribers=subscribe::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        dd($subscribers);
        return Inertia::render("Admin/Subscribers",[
            "programs"=>$program,
            "subscribers"=>$subscribers,
            "notification"=>$notification
        ]);
    }


    public function UserAdminView($id){
        $user=User::findOrFail($id);
       $subscribe=$user->subscription;
       $profile=$user->Profile;
       $program=Program::all();
       $notification=auth()->user()->notifications->where("read_at",null)->all(); 
      return Inertia::render("Admin/UserProfile",[
        "subscription"=>$subscribe,
        "user"=>$user,
        "profile"=>$profile,
        "programs"=>$program,
        "notification"=>$notification
      ]);
    }

    public function SendMessage(){
        $data=request()->all();
        $user=User::findOrFail($data["UserId"]);
        $message=[
            "name"=>$user->name,
            "message"=>$data['message'],
        ];
        $user->notify(new NotificationMessage($message));

        return back()->with("message","Message successfully sent");
       
    }
    public function SendDiscount(){
        $data=request()->all();
        $user=User::findOrFail($data["UserId"]);
        $message=[
            "name"=>$user->name,
            "message"=>"to have a special discount use the following code while making payment",
            "discount"=>$data["message"],
            "sender"=>auth()->user()->name,
        ];
        $user->notify(new NotificationMessage($message));

        return back()->with("message","Message successfully sent");
       
    }

    public function discountCodeView(){
        $program=Program::all();
        $notification=auth()->user()->notifications->where("read_at",null)->all(); 
        $discount=Discount::all();

        return Inertia::render("Admin/discountCode",[
            "programs"=>$program,
            "notification"=>$notification,
            "discount"=>$discount
        ]);
    }

    public function generateDiscount(){
        $code=Str::random(7);
       Discount::create([
        "discount_code"=>$code,
        "amount"=>request()["message"]
       ]);
        return back();
    }
   
}

