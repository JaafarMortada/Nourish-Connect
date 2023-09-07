<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usertypes', function (Blueprint $table) {
            $table->id();
            $table->string('usertype');
            $table->longText('extra')->nullable();
            $table->timestamps();
        });

        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->float('latitude');
            $table->float('longitude');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('company_name');
            $table->string('email')->unique();
            $table->longText('password');
            $table->unsignedBigInteger('usertype_id');
            $table->text('pic_url')->nullable();
            $table->unsignedBigInteger('location_id');
            $table->timestamps();
            $table->foreign('usertype_id')->references('id')->on('usertypes')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('usertypes');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('users');
    }
};
