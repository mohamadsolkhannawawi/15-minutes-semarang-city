<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import semua controller yang kita butuhkan
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\PublicServiceController;
use App\Http\Controllers\Api\ServiceCategoryController;
use App\Http\Controllers\Api\ServiceImageController;
use App\Http\Controllers\Api\ServiceReviewController;
use App\Http\Controllers\Api\UserSearchController;
use App\Http\Controllers\Api\WalkabilityZoneController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Menggunakan apiResource untuk membuat route CRUD standar (index, store, show, update, destroy)
Route::apiResource('districts', DistrictController::class);
Route::apiResource('public-services', PublicServiceController::class);
Route::apiResource('service-categories', ServiceCategoryController::class);
Route::apiResource('service-images', ServiceImageController::class);
Route::apiResource('service-reviews', ServiceReviewController::class);
Route::apiResource('user-searches', UserSearchController::class);
Route::apiResource('walkability-zones', WalkabilityZoneController::class);

// Route khusus untuk fungsi tambahan di controller
// Endpoint untuk mendapatkan fasilitas dalam zona tertentu
Route::get('services/in-zone/{search_id}', [PublicServiceController::class, 'getInZone']);

// Endpoint untuk mengecek apakah sebuah titik sudah ada di dalam zona yang tersimpan
Route::post('walkability-zones/check', [WalkabilityZoneController::class, 'check']);