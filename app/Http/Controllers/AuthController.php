<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use Carbon\Carbon;
use App\Models\VerificationCode;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('Request data received: ', $request->all());
    
        // Validate the request
        $request->validate([
            'email' => 'required|email|unique:users,email',
        ]);
    
        try {
            // Create a new user
            $user = User::create([
                'email' => $request->email,
                'is_verified' => false,
            ]);
    
            // Check if user creation was successful
            if (!$user || !$user->exists) {
                Log::error('User creation failed.');
                return response()->json(['error' => 'Failed to register user. Please try again.'], 500);
            }
    
            Log::info('User created successfully: ', $user->toArray());
    
            // Pass the user object to sendVerificationCode
            $this->sendVerificationCode($user);
    
            return response()->json(['message' => 'A verification code has been sent to your email.'], 201);
        } catch (\Exception $e) {
            Log::error('Error during registration: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to register user. Please try again.'], 500);
        }
    }
    


    public function sendVerificationCode(string $email)
{
    $verificationCode = rand(100000, 999999);

    VerificationCode::create([
        'email' => $email,
        'code' => $verificationCode,
        'expires_at' => now()->addMinutes(10),
        'used' => false,
    ]);

    Mail::to($email)->send(new VerificationCodeMail($verificationCode));

    return response()->json(['message' => 'Verification code sent successfully.']);
}


    /**
     * Verify the user's email using the verification code.
     */
    public function verifyCode(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required|string|size:6',
    ]);

    $verificationCode = VerificationCode::where('email', $request->email)
        ->where('code', $request->code)
        ->where('used', false)
        ->where('expires_at', '>', Carbon::now())
        ->first();

    if (!$verificationCode) {
        return response()->json(['error' => 'Invalid or expired verification code.'], 400);
    }

    // Mark the code as used
    $verificationCode->update(['used' => true]);

    return response()->json(['message' => 'Verification successful.'], 200);
}
    /**
     * Test email functionality.
     */
    public function testEmail()
    {
        try {
            Mail::raw('This is a test email', function ($message) {
                $message->to('your-email@example.com')
                    ->subject('Test Email');
            });

            if (Mail::failures()) {
                Log::error('Failed to send test email.');
                return response()->json(['error' => 'Failed to send test email.'], 500);
            }

            Log::info('Test email sent successfully.');
            return response()->json(['message' => 'Test email sent successfully.']);
        } catch (\Exception $e) {
            Log::error('Error in testEmail: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to send test email.'], 500);
        }
    }

    /**
     * Logout a user and revoke all tokens.
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            Log::info('User logged out successfully.', ['user_id' => $request->user()->id]);
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Exception $e) {
            Log::error('Error logging out: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to log out.'], 500);
        }
    }

    /**
     * Placeholder admin endpoint.
     */
    public function admin()
    {
        return response()->json(['message' => 'Welcome Admin']);
    }

    /**
     * Placeholder client endpoint.
     */
    public function client()
    {
        return response()->json(['message' => 'Welcome Client']);
    }
}
