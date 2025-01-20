<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;

class AuthController extends Controller
{
    public function sendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        // Generate 6-digit code
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Store code in database
        VerificationCode::create([
            'email' => $request->email,
            'code' => $code,
            'expires_at' => now()->addMinutes(10),
            'used' => false
        ]);

        // Send email with code
        Mail::to($request->email)->send(new VerificationCodeMail($code));

        return response()->json(['message' => 'Verification code sent']);
    }

    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        $verificationCode = VerificationCode::where('email', $request->email)
            ->where('code', $request->code)
            ->where('used', false)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (!$verificationCode) {
            return back()->withErrors(['code' => 'Invalid or expired verification code']);
        }

        $verificationCode->used = true;
        $verificationCode->save();

        $user = User::where('email', $request->email)->first();
        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
    // Register a new user
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

         $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'client', // Default to client role
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // Login a user and generate a token
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:6',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid login credentials'], 401);
    }

    /** @var user */
    $user = Auth::user();

    // Check if user instance exists
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
    ]);
}

    // Logout a user and revoke all tokens
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Admin-specific endpoint
    public function admin()
    {
        return response()->json(['message' => 'Welcome Admin']);
    }

    // Client-specific endpoint
    public function client()
    {
        return response()->json(['message' => 'Welcome Client']);
    }
    
}
