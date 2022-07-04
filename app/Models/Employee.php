<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model 
{

    protected $table = 'employees';
    public $timestamps = true;

    use SoftDeletes;
    protected $fillable = [
        'name',
        'secret',
        'employee_id',
        'status'

    ];

    protected $dates = ['deleted_at'];

    public function attendances()
    {
        return $this->hasMany('App\Models\Attendance', 'employee_id');
    }

}