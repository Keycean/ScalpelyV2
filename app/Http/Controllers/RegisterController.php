<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle user registration and send a verification code.
     */
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Create user
        try {
            $user = User::create([
                'email' => $request->email,
                'is_verified' => false,
            ]);

            if (!$user) {
                return response()->json(['error' => 'Failed to register user.'], 500);
            }

            // Generate a verification code
            $verificationCode = rand(100000, 999999);
            $user->verification_code = $verificationCode;
            $user->save();

            // Send the verification email
            Mail::to($user->email)->send(new VerificationCodeMail($verificationCode));

            Log::info('Verification email sent to ' . $user->email);

            return response()->json(['message' => 'A verification code has been sent to your email.'], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }

    /**
     * Verify the user's email using the verification code.
     */
    public function verifyEmail(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'code' => 'required|size:6',
    ]);

    // Find user based on email and verification code
    $user = User::where('email', $request->email)
                ->where('verification_code', $request->code)
                ->first();

    if (!$user) {
        return response()->json(['error' => 'Invalid verification code.'], 400);
    }

    // Mark user as verified and clear the verification code
    $user->is_verified = true;
    $user->verification_code = null;
    $user->save();

    // Return response with success message and redirect URL
    return response()->json([
        'message' => 'Email verified successfully.',
        'redirect' => '/onboard', // Redirect to onboarding page
    ], 200);
}
}
