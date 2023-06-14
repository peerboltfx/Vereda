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
        Schema::create('uploaded_courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->String("name");
            $table->String("batch");
            $table->String('course_id');
            $table->unsignedBigInteger('user_id');
            $table->index('user_id'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('uploaded_courses');
    }
};
