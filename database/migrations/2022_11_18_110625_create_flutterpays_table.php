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
        Schema::create('flutterpays', function (Blueprint $table) {
            $table->timestamps();
            $table->string('name');
            $table->string('program');
            $table->string('payment_id')->nullable();
            $table->string('razorpay_id')->nullable();
            $table->string('payment_done')->default(false);
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
        Schema::dropIfExists('flutterpays');
    }
};
