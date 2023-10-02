<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->unsignedBigInteger('donator_id');
            $table->unsignedBigInteger('receiver_id');
            $table->boolean('anonymous')->default(false);
            $table->timestamps();
            $table->foreign('donator_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');

        });

        Schema::create('donations_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->bigInteger('quantity');
            $table->unsignedBigInteger('donation_id');
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('donation_id')->references('id')->on('donations')->onDelete('cascade');

        });

        Schema::create('charities_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('charity_id');
            $table->string('title');
            $table->longText('description');
            $table->string('category');
            $table->string('quantity');
            $table->foreign('charity_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
        Schema::dropIfExists('donations_items');
        Schema::dropIfExists('charities_requests');

    }
};
