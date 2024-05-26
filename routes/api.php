<?php

use App\Http\Controllers\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// This route is used for authenticated user data
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// This route is used to get the count of companies
Route::get('/companies/count', [CompanyController::class, 'count'])->name('api.companies.count');
