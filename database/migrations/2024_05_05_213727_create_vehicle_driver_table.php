<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehicleDriverTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicle_driver', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_assigment')->default(now()); 
            $table->dateTime('date_deallocation')->nullable();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('driver_id');

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');

            $table->foreign('vehicle_id')->references('id')->on('vehicles')->onDelete('cascade'); // vehiculo

            $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade'); // conductor
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
        Schema::dropIfExists('vehicle_driver');
    }
}
