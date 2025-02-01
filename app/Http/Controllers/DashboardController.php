<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Dashboard', [
            'pageTitle' => 'Dashboard',
            // Add any additional data you want to pass to your dashboard component
        ]);
    }
}