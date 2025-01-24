<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OnboardController extends Controller
{
    /**
     * Render the onboarding page.
     */
    public function index()
    {
        return Inertia::render('Onboard'); // Ensure the component is named 'Onboard'
    }
}
