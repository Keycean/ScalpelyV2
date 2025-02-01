<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOnboardingColumns extends Migration
{
    public function up()
    {
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->string('invited_emails')->nullable();
            $table->string('add_members')->nullable();
        });
    }

    public function down()
    {
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->dropColumn('invited_emails');
            $table->dropColumn('add_members');
        });
    }
}