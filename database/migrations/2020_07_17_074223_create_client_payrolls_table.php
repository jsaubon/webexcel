<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientPayrollsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_payrolls', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id')->unsigned();
            $table->integer('employee_id')->unsigned();
            $table->integer('days_present');
            $table->integer('hours_overtime')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_payrolls');
    }
}
