
<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\GoogleController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\OnboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return Inertia::render('Home');
});


Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
 
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
});


// This is for the onboarding route, ensuring it's open for guests (unauthenticated users)
Route::get('/onboard', [OnboardController::class, 'index'])->name('onboard');


Route::middleware(['web'])->group(function () {
    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])
        ->name('google.login');
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});

// Route::post('/auth/send-verification', [AuthController::class, 'sendVerificationCode']);
// Route::post('/verify-code', [AuthController::class, 'verifyCode'])->name('verify-code');


