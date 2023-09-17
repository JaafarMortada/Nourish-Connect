<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations_suggestions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('charity_id');
            $table->bigInteger('quantity');
            $table->boolean('approved')->default(false);
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('charity_id')->references('id')->on('users')->onDelete('cascade');

        });

        Schema::create('discounts_suggestions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->float('percentage');
            $table->date('until');
            $table->boolean('approved')->default(false);
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations_suggestions');
        Schema::dropIfExists('discounts_suggestions');
    }
};
