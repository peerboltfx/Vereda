<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string("question")->nullable();
            $table->string("option1")->nullable();
            $table->string("option2")->nullable();
            $table->string("option3")->nullable();
            $table->string("option4")->nullable();
            $table->string("answer")->nullable();
            $table->string("batch")->nullable();
            $table->string("course")->nullable();
            $table->string("trainerid")->nullable();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->index('user_id'); 



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
        Schema::dropIfExists('questions');
    }
};
