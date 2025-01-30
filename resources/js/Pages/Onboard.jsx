import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const OnboardSteps = {
  PERSONAL_INFO: 'personal_info',
  WORKSPACE: 'workspace',
  ADD_MEMBERS: 'add_members',
  COMPLETE: 'complete',
};

export default function Onboard({ user }) {
  const [currentStep, setCurrentStep] = useState(OnboardSteps.PERSONAL_INFO);
  const [formData, setFormData] = useState({
    work: '',
    role: '',
    company: '',
    interests: [],
    notifications: true,
    workspace_name: '',
    workspace_icon: null, // Added to handle icon
    add_members: '',
  });

  // Load the current step from localStorage on component mount
  useEffect(() => {
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep && OnboardSteps[savedStep.toUpperCase()]) {
      setCurrentStep(savedStep);
    }
  }, []);

  // Update localStorage whenever the current step changes
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMore = () => {
    setEmails([...emails, '']);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        workspace_icon: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    const endpoint =
      currentStep === OnboardSteps.PERSONAL_INFO
        ? '/onboard/step1'
        : currentStep === OnboardSteps.WORKSPACE
        ? '/onboard/step2'
        : currentStep === OnboardSteps.ADD_MEMBERS
        ? '/onboard/step3'
        : '/onboard/complete';
  
    router.post(endpoint, formDataToSend, {
      onSuccess: () => {
        if (currentStep === OnboardSteps.PERSONAL_INFO) {
          setCurrentStep(OnboardSteps.WORKSPACE);
        } else if (currentStep === OnboardSteps.WORKSPACE) {
          setCurrentStep(OnboardSteps.ADD_MEMBERS);
        } else if (currentStep === OnboardSteps.ADD_MEMBERS) {
          setCurrentStep(OnboardSteps.COMPLETE);
        }
      },
    });
  };
  

  

  const renderPersonalInfo = () => (
    <div className="w-full max-w-2xl px-6 py-8 bg-transparent text-white flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-6 text-center">Tell us about yourself</h2>
      <p className="text-4xl font-medium mb-6 text-[#BBB6B6] text-center tracking-wide">
        This helps show relevant content
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Work field */}
        <div>
          <label className="block text-sm font-medium text-[#BBB6B6] mb-1">
            What kind of work do you do?
          </label>
          <select
            name="work"
            value={formData.work}
            onChange={handleInputChange}
            className="block w-full h-10 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="doctor">Doctor</option>
            <option value="engineer">Engineer</option>
            <option value="teacher">Teacher</option>
            <option value="artist">Artist</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Role field */}
        <div>
          <label className="block text-sm font-medium text-[#BBB6B6] mb-1">What's your role?</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="block w-full h-10 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="manager">Team Manager</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="marketer">Marketer</option>
            <option value="analyst">Analyst</option>
          </select>
        </div>

        {/* Company size field */}
        <div>
          <label className="block text-sm font-medium text-[#BBB6B6] mb-1">What's the size of your company?</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="block w-full h-10 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="1-49">1-49</option>
            <option value="50-249">50-249</option>
            <option value="250-499">250-499</option>
            <option value="500+">500+</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 flex mt-10 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );

  const renderWorkspace = () => (
    <div className="w-full max-w-2xl px- py-8 bg-[#1D2A4D] text-white flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Give your workspace a name
      </h2>
      <p className="text-lg font-medium mb-6 text-[#BBB6B6] text-center">
        The details are helpful for any collaborators who join.
      </p>
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="workspace_icon"
          className="w-16 h-16 flex items-center justify-center rounded-full bg-black cursor-pointer text-white text-4xl font-bold"
        >
          {formData.workspace_icon ? (
            <img
              src={URL.createObjectURL(formData.workspace_icon)}
              alt="Workspace Icon"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            "S"
          )}
        </label>
        <input
          type="file"
          id="workspace_icon"
          accept="image/*"
          onChange={handleIconChange}
          className="hidden"
        />
        <p className="mt-2 text-sm text-gray-400">Choose or add an icon</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <label
            htmlFor="workspace_name"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Workspace name
          </label>
          <input
            type="text"
            id="workspace_name"
            name="workspace_name"
            value={formData.workspace_name}
            onChange={handleInputChange}
            placeholder="Scalpel Inc."
            className="w-full p-2 rounded border border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-400">
            The name of your company or organization
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
        >
          Continue
        </button>
      </form>
    </div>
    //Add members
    
  );
  const renderAddmembers = () => (
    <div className="w-full max-w-2xl px-6 py-8 bg-[#1D2A4D] text-white flex flex-col justify-center items-center rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center">Add Your Team Members</h2>
      <p className="text-lg font-medium mb-6 text-[#BBB6B6] text-center">
        Invite your team members to collaborate on projects.
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label htmlFor="add_members" className="block text-sm font-medium text-[#BBB6B6] mb-1">
            Add Members
          </label>
          <input
            type="email"
            id="add_members"
            name="add_members"
            value={formData.add_members}
            onChange={handleInputChange}
            placeholder="Enter email addresses separated by commas"
            className="block w-full h-10 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="space-y-3">
        <button
          type="button"
          onClick={handleAddMore}
          className="flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          <span className="mr-2">＋</span>
          Add more or bulk invite
        </button>
          <button
            type="button"
            className="w-full p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded transition-colors"
          >
            Copy invite link
          </button>
          <button
            type="submit"
            className="w-full p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded transition-colors"
          >
            Take me to Scalpely
          </button>
        </div>
      </form>
    </div>
  );
     
  return (
    <>
      <Head title="Onboard" />
      <main className="min-h-screen bg-[#1D2A4D] py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col justify-center items-center">
          {currentStep === OnboardSteps.PERSONAL_INFO && renderPersonalInfo()}
          {currentStep === OnboardSteps.WORKSPACE && renderWorkspace()}
          {currentStep === OnboardSteps.ADD_MEMBERS && renderAddmembers()}
        </div>
      </main>
    </>
  );
}