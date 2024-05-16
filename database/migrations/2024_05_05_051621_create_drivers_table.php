<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('ci')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('photo')->nullable();

            $table->foreignId('id_cities')
                ->nullable()
                ->constrained('cities')
                ->cascadeOnUpdate()/* actualizacion en cascada */
                ->nullOnDelete(); /* y cuando se elimine quede en null */

                $table->foreignId('id_user')
                ->nullable()
                ->constrained('users')
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
        Schema::dropIfExists('drivers');
    }
}
