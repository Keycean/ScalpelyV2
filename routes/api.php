<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\OnboardController;
use App\Http\Controllers\LoginController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::match(['get', 'post'], '/test-email', [AuthController::class, 'testEmail']); // Only POST for test email

// Verification routes
Route::post('register', [RegisterController::class, 'register']);
Route::post('verify-email', [RegisterController::class, 'verifyEmail']);
// Login routes
Route::post('/initiate', [LoginController::class, 'initiateLogin']);
Route::post('/verify', [LoginController::class, 'verifyLogin']);

// Onboarding route
Route::post('/onboard', [OnboardController::class, 'store']);

// Routes requiring authentication
Route::middleware('auth:sanctum')->group(function () {
    // User info route
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin and Client routes with role-based middleware
    Route::middleware('role:admin')->get('/admin', [AuthController::class, 'admin']);
    Route::middleware('role:client')->get('/client', [AuthController::class, 'client']);

    // Verification routes (for authenticated users)
   

});

