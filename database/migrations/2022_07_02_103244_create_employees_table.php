<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEmployeesTable extends Migration {

	public function up()
	{
		Schema::create('employees', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->softDeletes();
			$table->string('name');
			$table->string('employee_id')->nullable();
			$table->string('secret')->unique();
			$table->tinyInteger('status')->default('1');
		});
	}

	public function down()
	{
		Schema::drop('employees');
	}
}