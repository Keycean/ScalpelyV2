<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingDetail extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'onboarding_details';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'work',
        'role',
        'company',
        'workspace_name',
        'workspace_icon',
        'add_members',
    ];

    /**
     * Get the user associated with the onboarding detail.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
