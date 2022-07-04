<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model 
{

    protected $table = 'attendances';
    public $timestamps = true;
    protected $fillable = [
    
        'type',
        'employee_id',
       

    ];

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function employee()
    {
        return $this->belongsTo('App\Models\Employee');
    }

}