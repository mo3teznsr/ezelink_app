<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('r', [AuthController::class,'refresh']);
    Route::get('/', [AuthController::class,'me']);

});

Route::post('/check',function(Request $request){
    $employee=App\Models\Employee::where(['secret'=>$request->secret,'status'=>1])->first();

    if(!$employee)
   { return response()->json(['message'=>'user not found','result'=>true], 401);}
  $addendance=App\Models\Attendance::where(['employee_id'=>$employee->id])->whereDate('created_at',date('Y-m-d'))->first();
  if(!$addendance)
  {
    App\Models\Attendance::create(['employee_id'=>$employee->id,'type'=>'checkin']);
    return response()->json(['message'=>"Hello,".$employee->name." you have successfully checkin",'result'=>1]);
  }
  else{
    $checkout=App\Models\Attendance::where(['employee_id'=>$employee->id,'type'=>'checkout'])->whereDate('created_at',date('Y-m-d'))->first();
    if(!$checkout)
  {
    App\Models\Attendance::create(['employee_id'=>$employee->id,'type'=>'checkout']);
    return response()->json(['message'=>"Hello,".$employee->name." you have successfully checkout",'result'=>1]);
  }
  $checkout->delete();
  App\Models\Attendance::create(['employee_id'=>$employee->id,'type'=>'checkout']);
  return response()->json(['message'=>"Hello,".$employee->name." you have successfully update your checkout",'result'=>1]);
  }
   // return ['message'=>'Hello, Ahmed You have checkin succefully','result'=>true];
});


Route::get('/hash',function(){
    return \Hash::make('12345678');
});

Route::resource('attendance', App\Http\Controllers\AttendanceController::class);
Route::post('attendance/day', [App\Http\Controllers\AttendanceController::class,'day']);
Route::post('attendance/month', [App\Http\Controllers\AttendanceController::class,'month']);
Route::resource('employee', App\Http\Controllers\EmployeeController::class);