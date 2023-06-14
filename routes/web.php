<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\FlutterpayController;
use App\Http\Controllers\DailyPlanController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\DB;
use App\Models\Program;
use App\Models\daily_plan;
use App\Models\subscribe;
use App\Models\Messages;
use App\Models\testReport;
use App\Http\Controllers\ProfileController;
use App\Models\batch;
use App\Models\order_item;
use App\Events\NotifyPlan;
use Razorpay\Api\Api;
use App\Models\User;



use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $program=DB::table('programs')->get();
   $batch=DB::table('batches')->where('options','open')->get();
   $fullstack=$batch->where("name","Full Stack Development Program")->last();
   $flutter=$batch->where("name","Flutter Development Program")->last();
    if(Inertia::render('Home')){
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'programs'=> $program,
        'batch'=>$batch,
        'fullstack'=>$fullstack,
        'flutter'=>$flutter
    ]);
}
else{
    return view("welcome");
}
})->name('home');

Route::get('/pages/privacy-policy', function(){
    $programs=DB::table('programs')->get();
    return Inertia::render('PrivacyPolicy',['programs'=>$programs]);
})->name('PrivacyPolicy');

Route::get('/pages/refund-policy', function(){
    $programs=DB::table('programs')->get();
    return Inertia::render('RefundPolicy',['programs'=>$programs]);
})->name('RefundPolicy');

Route::get('/pages/terms-and-conditions', function(){
    $programs=DB::table('programs')->get();
    return Inertia::render("termsAndCondition",[
        'programs'=>$programs,
    ]);
})->name("TermsAndCond");

Route::get("/pages/view-courses",[SendMailController::class, "viewCourse"]);

Route::post("/news-form",[SendMailController::class, "newsForm"]);

Route::get("/pages/about", function(){
    return Inertia::render("about");
});

Route::get("/pages/contact", function(){
    return Inertia::render("contact");
});


Route::get('/moderator/create-study', function(){
    return Inertia::render('CreateProgramme');
})->middleware(['auth','verified'])->name('CreateProgramme');

Route::get('/Program/{program}', function($link){
    $explode=explode('-', $link);
    $implode=implode(' ',$explode);
    $programs=DB::table('programs')->get();
    $program=DB::table('programs')->where('program',$implode)->first();
    if($explode[0] == "Flutter"){
    return Inertia::render('FlutterDev', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'pricing'=> $program->price,
        'programs'=> $programs,
        'name'=>$program]
    );
}
else if($explode[0] == "Full"){
    return Inertia::render('FullstackDev', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'pricing'=> $program->price,
        'programs'=> $programs,
        'name'=>$program]
    );
}
else{
    return Inertia::render('/');
}    
});


Route::get('/error/',function(){
    $sub=subscribe::where('user_id',auth()->user()->id)->get();
    $program=Program::all();
    $notification=auth()->user()->notifications->where("read_at",null)->all(); 
    return Inertia::render('ErrorPage',[
        'errors'=>'We couldnt find the page you are Looking for, please make sure you provided the correct link to the requested page.',
        'errorCode'=>'404',
        "programs"=>$program,
        "notification"=>$notification,
        'verified'=>$sub,
        
    ]);
})->middleware(['auth']);

Route::get('/payment/{link}',function($link){

    $program=DB::table('programs')->where('program',$link)->first();
    
    $order=order_item::where(["user_id"=>auth()->user()->id,"program"=>$link])->get()->last();

    $sub=subscribe::where('user_id',auth()->user()->id)->get();
   
    $batch=batch::where(["name"=>$link,"options"=>"open"])->get()->last();
    
     $notification=auth()->user()->notifications->where("read_at",null)->all(); 
     if($order){
        return Inertia::render('Payment',[
            'dev'=> $link,
            'price'=>$program->price,
            'discount'=>$program,
            'name'=>auth()->user()->name,
            'orderId' => $order->orderId,
            'razorpayId' => $order->razorpayId,
            'amount' => $order->amount,
            'name' => $order->name,
            'currency' => 'INR',
            'program' => $order->program,
            "batch"=>$batch,
            "verified"=>$sub,
            "notification"=>$notification,
            'recure'=>$order->recure,
            'method'=>$order->method,
        ]);
    }
    else{
        
     return Inertia::render('Payment',[
        'dev'=> $link,
        'price'=>$program->price,
        'discount'=>$program,
        'name'=>auth()->user()->name,
        'batch'=>$batch,
         "verified"=>$sub,
          "notification"=>$notification,
    ]); }
})->name('payment')->middleware(["auth"]);

Route::post("/checkout/cancel-order/{order}",[SubscriptionController::class, "CancelOrder"])->middleware(["auth"]);

Route::get('/en/{session}/free-trial/{link}',[SubscriptionController::class,'trial'])->middleware(['auth','trialAttempt'])->name('FreeTrial');

Route::get('trial-attempt/{link}',function($link){
    $program=DB::table('programs')->where('program',$link)->first();
    return Inertia::render('Payment',[
        'dev'=> $link,
        'price'=>$program->price,
        'hint'=>"",
        'name'=>auth()->user()->name
    ]);
})->middleware(['auth']);

Route::post('/checkorder',[SubscriptionController::class, 'subscribing'])->middleware(['auth']);

Route::post("/request/send-message",function(){
       $data=request()->all();
      Messages::create($data);
      return back()->with('success',"Message sent!, we'll get back to you via the email address you provided");
});

Route::post('/request/call',[SendMailController::class,'mail']);

Route::get('/Program/Full-Stack-Development-Program', function(Program $check){
   
    $program=DB::table('programs')->where('program',"Full Stack Development Program")->first()->price;
   
    return Inertia::render('FullstackDev', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'pricing'=> $program,]);
       
})->name('FullStackDev');

//Notifcation section, Readnotification all, Read Notification Individually etc

Route::post("/read-notification",function(){
   $user= auth()->user()->unreadNotifications;
   
  
       
    $user->each->markAsRead();
   

   return back();

})->middleware(["auth"]);

Route::get("/notification/read-{id}",function($id){
     $notification=auth()->user()->unreadNotifications->where("id",$id); 
     $notification->markAsRead();
   return back();
    
});

/**User Authentication : Admin, Student, Moderator */
Route::get('/dashboard', function () {
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
     $notification=auth()->user()->notifications->where("read_at",null)->all(); 

       if(!(auth()->user()->role)){
    return redirect('/application/edit-profile')->with(['programs'=> $program]);
    }
    else if( auth()->user()->role == "student"){
   
    $userBatch=DB::table("subscribes")->where(["user_id"=>auth()->user()->id])->get()->last();
     if($userBatch){
        $userBatch=$userBatch->batch;
     };
     $course=DB::table("daily_plans")->where(["batch"=>$userBatch,"action"=>"created"])->orderByDesc("id")->take(5)->get();
     
        return view('successful',[
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
        
    $mod=daily_plan::where(['user_id'=>auth()->user()->id, "action"=>"pending"])->take(5)->get();//Moderator get Scheduled Studies
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
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/en/{session}/session/{link}',[SubscriptionController::class, 'index'])->middleware(['auth','ensurePayment'])->name('FullStackSession');

Route::get('/application/edit-profile',function(){
     $notification=auth()->user()->notifications->where("read_at",null)->all(); 
    $user=auth()->user();
    
    $program=Program::all();
    return Inertia::render("CreateApplication",[
        "user"=>$user,
        "programs"=>$program,
         "notification"=>$notification,
    ]);
})->middleware(['auth']);

Route::get('/profile/profile-edit',function(){
     $notification=auth()->user()->notifications->where("read_at",null)->all(); 
    $user=auth()->user();
    $profile=auth()->user()->Profile;
    $program=Program::all();
    $sub=subscribe::where('user_id',auth()->user()->id)->get();
    return Inertia::render("ProfileEdit",[
        "user"=>$user,
        "programs"=>$program,
        "profile"=>$profile,
        'verified'=>$sub,
         "notification"=>$notification,
    ]);
})->middleware(['auth'])->name("EditProfile");

Route::post("/profile/application-submit",[ProfileController::class, "create"])->middleware(['auth']);

Route::post("/profile/update",[ProfileController::class, "update"])->middleware(['auth']);

Route::get("/profile",[ProfileController::class, "index"])->middleware(['auth'])->name("Profile");

Route::get("/study/{code}-{id}",[SubscriptionController::class, 'studies'])->middleware(['auth','accessStudies']);

Route::get("/en/quiz/student/{origin}/{course}",[SubscriptionController::class, 'startQuiz'])->middleware(['auth']);

Route::post("/quiz/save",[SubscriptionController::class, "saveQuiz"])->middleware(["auth"]);

Route::get("/en/student-result",[SubscriptionController::class, "studentReport"])->middleware(["auth"])->name("StudentReportTable");

Route::post("/assignment/submit",[SubscriptionController::class, "Assignment"])->middleware(["auth"]);

Route::get("/student/my-assignments",[SubscriptionController::class, "viewAssignment"])->middleware(["auth"])->name("Assignment");
Route::get("/account/referral",[SubscriptionController::class, "ReferralPage"])->middleware(["auth"])->name('ReferralPage');

Route::post("/account/gerateReferral",[SubscriptionController::class,"GenerateReferral"])->middleware(["auth"]);

Route::get("/account/transactions",[SubscriptionController::class, "Transactions"])->middleware(["auth"])->name('Transactions');

Route::post("/student/mark-attendance",[SubscriptionController::class, "markAttendance"])->middleware(["auth"]);

Route::get("/get/{user}",function($user){
    $check=User::where("referral",$user)->get()->last();
    if($check){
        return redirect("/")->with('message', $check );
    }
    else{
        return redirect("/");
    }
});
/**
 *a routing post method for payment verification using razorpay
 *this will only perform after payment has successfully been made,
 * else payment verification middleware will prevent this action from taking place
 * PS: The two route belongs to Fullstack developement and Flutter developement
 * which is still under a static modulation
 */
Route::post('/razorpaypayment', [SubscriptionController::class, 'payment'])->name('payment');

Route::post('/razorpaypaymentflutter', [FlutterpayController::class, 'payment'])->name('payment');



/**
 * Below is routing session for moderator to perform a post, get , put 
 * patch etc.
 */

Route::get('/moderator/create/daily-plan',[DailyPlanController::class, 'index'])->middleware(['moderatorRole',"auth"])->name('dailyScheduler');

Route::post('/create/schedule-daily-plan',[DailyPlanController::class, 'create'])->middleware(['moderatorRole',"auth"]);

Route::get("/moderator/en/daily-plan",[DailyPlanController::class, "view"])->middleware(['moderatorRole'])->name("DailyPlanView","auth");

Route::get("/moderator/create-course/{code}/en/{id}",[DailyPlanController::class, "createCourse"])->middleware(["moderatorRole","auth"]);

Route::post("/moderator/edit-create-program/{program}/{id}",[DailyPlanController::class, "creatingCourse"])->middleware(['moderatorRole',"auth"]);

Route::post("/moderator/set-questions/{topic}/{id}",[DailyPlanController::class , "addQuestions"])->middleware(['moderatorRole',"auth"]);

Route::get("/moderator/ready-quesiton/{id}",[DailyPlanController::class, "readyquestion"])->middleware(["moderatorRole","auth"]);

Route::get("/moderator/delete-course/{id}",[DailyPlanController::class, "deletePlan"])->middleware(["moderatorRole","auth"]);

Route::get("/moderator/reupload-course/{id}",[DailyPlanController::class, "reuploadPlan"])->middleware(["moderatorRole","auth"]);

Route::get("/moderator/view-assignments",[DailyPlanController::class, "Assigmentview"])->middleware(["moderatorRole","auth"]);

Route::get("/moderator/assignment-{id}",[DailyPlanController::class, "AssignmentViewID"])->middleware(["moderatorRole","auth"]);

Route::post("/Moderator/assignment-update-{id}",[DailyPlanController::class, "assignmentUpdate"])->middleware(["moderatorRole"]);

Route::get("/Moderator/class",[DailyPlanController::class, "ModeratorsStudents"])->middleware(["moderatorRole","auth"])->name("ModeratorsStudents");

Route::get("/Moderator/view-students/{id}",[DailyPlanController::class, "ModeratorClass"])->middleware(["moderatorRole","auth"]);

Route::get("/Moderator/view-quiz",[DailyPlanController::class,"ModeratorQuiz"])->middleware(["moderatorRole","auth"])->name("createdQuiz");

Route::get("/Moderator/enter-questions/{id}",[DailyPlanController::class, "viewQUestions"])->middleware(["moderatorRole","auth"])->name("viewQUestions");

Route::post("/Moderator/delete-question/{id}",[DailyPlanController::class, "deleteQuestion"])->middleware(["moderatorRole"])->name("deleteQuestion");


//Administrator Routing Session for every activity including post/get/put/patch


Route::get('/admin/moderators',[AdminController::class, 'view'])->middleware(['Administrator',"auth"])->name('Moderators');

Route::get('/admin/all-users',[AdminController::class, 'Allusers'])->middleware(['Administrator',"auth"])->name('Users');

Route::get('/edit-moderator/{user}',[AdminController::class, 'editModerator'])->middleware(['Administrator',"auth"]);

Route::get('/admin/create-program',[AdminController::class, 'createView'])->middleware(['Administrator',"auth"])->name('createProgram');

Route::get('/admin/all-students', [AdminController::class, 'AllStudents'])->middleware(['Administrator',"auth"])->name('AdminStudents');

Route::post('/admin/edit/moderator/{user}',[AdminController::class, 'editting'])->middleware(['Administrator',"auth"]);

Route::post('/admin/create-new-program',[AdminController::class, 'createNewprogram'])->middleware(['Administrator',"auth"]);

Route::post('/admin/edit-batch/{user}',[AdminController::class, 'editBatch'])->middleware(['Administrator',"auth"]);

Route::post('/admin/create-batch',[AdminController::class, 'createBatch'])->middleware(['Administrator',"auth"]);

Route::post("/admin/delete/batch/{id}",[AdminController::class, 'deleteBatch'])->middleware(['Administrator',"auth"]);

Route::post("/admin/update/batch/{id}",[AdminController::class, 'updateBatch'])->middleware(['Administrator',"auth"]);

Route::get("/admin/edit-program/{id}",[AdminController::class, 'editProgram'])->middleware(['Administrator',"auth"]);

Route::post("/admin/edit-post-program/{id}",[AdminController::class,'updateProgram'])->middleware(['Administrator',"auth"]);

Route::post("/admin/delete-program/{id}",[AdminController::class,'deleteProgram'])->middleware(['Administrator',"auth"]);

Route::get('/en/Admin-dashboard',[AdminController::class,'AdminDashboard'])->middleware(['Administrator',"auth"])->name('AdminDashboard');

Route::get('/admin/ordered-items',[AdminController::class, "OrderItems"])->middleware(['Administrator','auth'])->name('OrderItems');

Route::get("/admin/subscribers",[AdminController::class, "PaidUser"])->middleware(["Administrator","auth"])->name("PaidUser");

Route::get('/users-profile/{id}',[AdminController::class, "UserAdminView"])->middleware(["Administrator","auth"]);

Route::post("/admin/sendMessage", [AdminController::class, "SendMessage"])->middleware(["Administrator", "auth"]);

Route::post("/admin/sendDiscount", [AdminController::class, "SendDiscount"])->middleware(["Administrator", "auth"]);

Route::get("/admin/create-discount",[AdminController::class, "discountCodeView"])->middleware(["Administrator","auth"]);

Route::post("/admin/createDiscount",[AdminController::class,"generateDiscount"])->middleware(["Administrator","auth"]);

require __DIR__.'/auth.php';
