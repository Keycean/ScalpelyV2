<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function initiateLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            // Find or create user
            $user = User::firstOrCreate(
                ['email' => $request->email],
                ['is_verified' => false]
            );

            // Generate verification code
            $verificationCode = rand(100000, 999999);
            $user->verification_code = $verificationCode;
            $user->save();

            // Send verification email
            Mail::to($user->email)->send(new VerificationCodeMail($verificationCode));

            Log::info('Login verification email sent to ' . $user->email);

            return response()->json([
                'message' => 'Verification code sent to your email.',
                'email' => $user->email
            ], 200);
        } catch (\Exception $e) {
            Log::error('Login initiation error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to initiate login.'], 500);
        }
    }

    public function verifyLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|size:6',
        ]);

        $user = User::where('email', $request->email)
                    ->where('verification_code', $request->code)
                    ->first();

        if (!$user) {
            return response()->json(['error' => 'Invalid verification code.'], 400);
        }

        // Login user
        Auth::login($user);
        
        // Clear verification code
        $user->verification_code = null;
        $user->save();

        return response()->json([
            'message' => 'Login successful',
            'redirect' => $user->is_verified ? '/dashboard' : '/onboard'
        ], 200);
    }
}