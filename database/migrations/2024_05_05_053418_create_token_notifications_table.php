<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokenNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('token_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('token')->nullable();
            $table->string('device')->nullable();
            $table->foreignId('id_driver')
            ->nullable()
            ->constrained('drivers')
            ->cascadeOnUpdate()/* actualizacion en cascada */
            ->nullOnDelete(); /* y cuando se elimine quede en null */

            $table->foreignId('id_customer')
            ->nullable()
            ->constrained('customers')
            ->cascadeOnUpdate()/* actualizacion en cascada */
            ->nullOnDelete(); /* y cuando se elimine quede en null */

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
        Schema::dropIfExists('token_notifications');
    }
}
