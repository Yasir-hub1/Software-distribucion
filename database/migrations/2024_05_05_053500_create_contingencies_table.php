<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContingenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contingencies', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('photo')->nullable();

            $table->foreignId('id_order')
            ->nullable()
            ->constrained('orders')
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
        Schema::dropIfExists('contingencies');
    }
}
