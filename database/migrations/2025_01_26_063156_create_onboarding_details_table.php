<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnboardingDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('onboarding_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('work');
            $table->string('role');
            $table->string('company');
            $table->timestamps();
        
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Automatically delete related rows
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('onboarding_details');
    }
}
