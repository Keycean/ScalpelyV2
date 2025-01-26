<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OnboardingDetail;
use Inertia\Inertia;

class OnboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Render the onboarding page.
     */
    public function index()
    {
        return Inertia::render('Onboard');
    }

    /**
     * Store onboarding data (Step 1: Personal Information).
     */
    public function storeStep1(Request $request)
    {
        if (!$request->user()) {
            return redirect('/login')->with('error', 'You need to log in first.');
        }

        $validated = $request->validate([
            'work' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'required|string|max:255',
        ]);

        OnboardingDetail::updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        return response()->json(['success' => true, 'nextStep' => 'workspace']);
    }

    /**
     * Store workspace data (Step 2: Workspace Information).
     */
    public function storeStep2(Request $request)
    {
        if (!$request->user()) {
            return redirect('/login')->with('error', 'You need to log in first.');
        }

        $validated = $request->validate([
            'workspace_name' => 'required|string|max:255',
            'workspace_icon' => 'nullable|file|image|max:2048', // Validate optional image
        ]);

        // Handle file upload if provided
        if ($request->hasFile('workspace_icon')) {
            $iconPath = $request->file('workspace_icon')->store('workspace_icons', 'public');
            $validated['workspace_icon'] = $iconPath;
        }

        OnboardingDetail::where('user_id', $request->user()->id)
            ->update($validated);

        return response()->json(['success' => true, 'nextStep' => 'add_members']);
    }

    /**
     * Store team member data (Step 3: Add Members).
     */
    public function storeStep3(Request $request)
    {
        if (!$request->user()) {
            return redirect('/login')->with('error', 'You need to log in first.');
        }

        $validated = $request->validate([
            'add_members' => 'nullable|string', // Accept comma-separated emails
        ]);

        OnboardingDetail::where('user_id', $request->user()->id)
            ->update($validated);

        return response()->json(['success' => true, 'nextStep' => 'complete']);
    }

    /**
     * Finalize onboarding (Step 4: Complete).
     */
    public function completeOnboarding(Request $request)
    {
        if (!$request->user()) {
            return redirect('/login')->with('error', 'You need to log in first.');
        }

        $user = $request->user();

        // Mark onboarding as complete (if you have a flag for it)
        OnboardingDetail::where('user_id', $user->id)->update(['onboarding_completed' => true]);

        return redirect('/dashboard')->with('success', 'Onboarding completed!');
    }
}
