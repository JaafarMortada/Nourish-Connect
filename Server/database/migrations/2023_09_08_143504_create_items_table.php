<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {

        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('location_id');
            $table->longText('description');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');

        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->float('price');
            $table->float('original_price');
            $table->bigInteger('initial_quantity');
            $table->bigInteger('available_quantity');
            $table->date('production_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->bigInteger('pic_url')->nullable();
            $table->string('category');
            $table->text('barcode');
            $table->unsignedBigInteger('inventory_id');
            $table->timestamps();
            $table->foreign('inventory_id')->references('id')->on('inventories')->onDelete('cascade');
            
        });

        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inventory_id');
            $table->longText('barcode');
            $table->timestamps();
            $table->foreign('inventory_id')->references('id')->on('inventories')->onDelete('cascade');

        });

        Schema::create('carts_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('cart_id');
            $table->bigInteger('quantity');
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');

        });

        Schema::create('cashiers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('cashier_id');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('cashier_id')->references('id')->on('users')->onDelete('cascade');

        });

        Schema::create('cashiers_logins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cashier_id');
            $table->timestamps();
            $table->foreign('cashier_id')->references('id')->on('cashiers')->onDelete('cascade');
        });

        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->float('percentage');
            $table->unsignedBigInteger('company_id');
            $table->date('until');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('users')->onDelete('cascade');

        });

        Schema::create('discounts_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('item_id');
            $table->bigInteger('quantity');
            $table->unsignedBigInteger('discount_id');
            $table->timestamps();
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
        Schema::dropIfExists('inventories');
        Schema::dropIfExists('cart');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('cashiers');
        Schema::dropIfExists('cashiers_logins');
        Schema::dropIfExists('discounts');
        Schema::dropIfExists('discounts_items');

    }
};
