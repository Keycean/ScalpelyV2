
<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\GoogleController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\AuthController;

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


Route::middleware(['web'])->group(function () {
    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])
        ->name('google.login');
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
    
    // Protected onboard route
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/onboard', function () {
            return Inertia::render('Onboard', [
                'user' => auth()->user()
            ]);
        })->name('onboard');
    });
});

Route::post('/auth/send-verification', [AuthController::class, 'sendVerificationCode']);
Route::post('/verify-code', [AuthController::class, 'verifyCode'])->name('verify-code');
