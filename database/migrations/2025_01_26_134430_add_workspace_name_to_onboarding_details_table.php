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
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->string('workspace_name')->nullable(); // Add the column
            $table->string('workspace_icon')->nullable();

        });
    }
    
    public function down()
    {
        Schema::table('onboarding_details', function (Blueprint $table) {
            $table->dropColumn('workspace_name'); // Rollback the column
        });
    }
    
};
