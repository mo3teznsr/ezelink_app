<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAttendancesTable extends Migration {

	public function up()
	{
		Schema::create('attendances', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->softDeletes();
			$table->enum('type', array('checkin', 'checkout'));
			$table->integer('employee_id');
		});
	}

	public function down()
	{
		Schema::drop('attendances');
	}
}