<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class VerificationController extends Controller
{
    public function sendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            $code = rand(100000, 999999); // Generate a 6-digit code
            // Store the code in the database or cache for later verification
            // Cache::put('verification_' . $request->email, $code, now()->addMinutes(10));

            // Send the email
            Mail::to($request->email)->send(new \App\Mail\VerificationCodeMail($code));

            return response()->json(['message' => 'Verification code sent.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send verification code.'], 500);
        }
    }
}
