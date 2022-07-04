<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AttendanceController extends Controller 
{

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index()
  {
    
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return Response
   */
  public function create()
  {
    
  }

  /**
   * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store(Request $request)
  {
    
  }

  public function day(Request $request)
  {
    $result=\DB::Select("select employees.*,
     (select created_at from attendances where attendances.employee_id=employees.id and date(created_at)='$request->day' and type='checkin' limit 1) as checkin,
     (select created_at from attendances where attendances.employee_id=employees.id and date(created_at)='$request->day' and deleted_at is null and type='checkout' limit 1) as checkout
     from employees
    ");

    return $result;
  }
  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return Response
   */
  public function edit($id)
  {
    
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    
  }
  
}

?>