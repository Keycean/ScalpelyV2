// resources/js/Pages/Onboard.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const OnboardSteps = {
  PERSONAL_INFO: 'personal_info',
  PREFERENCES: 'preferences',
  COMPLETE: 'complete'
};

export default function Onboard({ user }) {
  const [currentStep, setCurrentStep] = useState(OnboardSteps.PERSONAL_INFO);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    interests: [],
    notifications: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    router.post('/api/onboard', formData, {
      onSuccess: () => {
        if (currentStep === OnboardSteps.PERSONAL_INFO) {
          setCurrentStep(OnboardSteps.PREFERENCES);
        } else if (currentStep === OnboardSteps.PREFERENCES) {
          setCurrentStep(OnboardSteps.COMPLETE);
        }
      }
    });
  };

  const renderPersonalInfo = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );

  const renderPreferences = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Set Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <select
              multiple
              name="interests"
              value={formData.interests}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData(prev => ({ ...prev, interests: values }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notifications: e.target.checked
              }))}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Receive notifications
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Complete Setup
          </button>
        </div>
      </form>
    </div>
  );

  const renderComplete = () => (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">🎉 All Set!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for completing your profile, {user.name}!
      </p>
      <a
        href="/dashboard"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go to Dashboard
      </a>
    </div>
  );

  return (
    <>
      <Head title="Onboard" />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {currentStep === OnboardSteps.PERSONAL_INFO && renderPersonalInfo()}
          {currentStep === OnboardSteps.PREFERENCES && renderPreferences()}
          {currentStep === OnboardSteps.COMPLETE && renderComplete()}
        </div>
      </main>
    </>
  );
}