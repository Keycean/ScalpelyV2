<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWorkspaceIconToOnboardingDetailsTable extends Migration
{
    public function up()
    {
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->string('workspace_icon')->nullable(); // Adding the workspace_icon column
        });
    }

    public function down()
    {
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->dropColumn('workspace_icon'); // Removing the column if rolled back
        });
    }
}

