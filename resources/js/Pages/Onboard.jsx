import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

//this is the route
const OnboardSteps = {
    PERSONAL_INFO: "personal_info",
    WORKSPACE: "workspace",
    ADD_MEMBERS: "add_members",
    BULK_INVITE: "bulk_invite",
    COMPLETE: "complete",
};

export default function Onboard({ user }) {
    const [currentStep, setCurrentStep] = useState(OnboardSteps.PERSONAL_INFO);
    const [formData, setFormData] = useState({
        work: "",
        role: "",
        company: "",
        interests: [],
        notifications: true,
        workspace_name: "",
        workspace_icon: null, // Added to handle icon
        add_members: "",
        invite_people1: "",
        invite_people2: "",
        invite_people3: "",
    });

    // Load the current step from localStorage on component mount
    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep");
        if (savedStep && OnboardSteps[savedStep.toUpperCase()]) {
            setCurrentStep(savedStep);
        }
    }, []);

    // Update localStorage whenever the current step changes
    useEffect(() => {
        localStorage.setItem("currentStep", currentStep);
    }, [currentStep]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddMore = () => {
        setCurrentStep(OnboardSteps.BULK_INVITE);
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
    const handleEmailChange = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setFormData((prev) => ({
            ...prev,
            add_members: newEmails.filter((email) => email).join(","),
        }));
    };
    const handleCopyInvite = () => {
        const inviteLink = "http://127.0.0.1:8000/onboard";

        navigator.clipboard
            .writeText(inviteLink)
            .then(() => alert("Invite link copied to clipboard!"))
            .catch((err) => console.error("Failed to copy: ", err));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        const endpoint =
            currentStep === OnboardSteps.PERSONAL_INFO
                ? "/onboard/step1"
                : currentStep === OnboardSteps.WORKSPACE
                ? "/onboard/step2"
                : currentStep === OnboardSteps.ADD_MEMBERS
                ? "/onboard/step3"
                : "/onboard/complete";

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
    const handleGoBack = () => {
        switch (currentStep) {
            case OnboardSteps.WORKSPACE:
                setCurrentStep(OnboardSteps.PERSONAL_INFO);
                break;
            case OnboardSteps.ADD_MEMBERS:
                setCurrentStep(OnboardSteps.WORKSPACE);
                break;
            case OnboardSteps.BULK_INVITE:
                setCurrentStep(OnboardSteps.ADD_MEMBERS);
                break;
            case OnboardSteps.COMPLETE:
                setCurrentStep(OnboardSteps.BULK_INVITE);
                break;
        }
    };

    const renderPersonalInfo = () => (
        <div className="w-full max-w-2xl px-6 py-8 bg-transparent text-white flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-6 text-center">
                Tell us about yourself
            </h2>
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
                    <label className="block text-sm font-medium text-[#BBB6B6] mb-1">
                        What's your role?
                    </label>
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
                    <label className="block text-sm font-medium text-[#BBB6B6] mb-1">
                        What's the size of your company?
                    </label>
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
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 text-cyan-300 hover:text-cyan transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
            </button>
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
                <p className="mt-2 text-sm text-gray-400">
                    Choose or add an icon
                </p>
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
                        placeholder="Scalpely Inc."
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
        <div className="w-full max-w-2xl px-6 py-8 bg-[#1D2A4D] text-white flex flex-col justify-center items-center ">
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 text-cyan-300 hover:text-cyan transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
            </button>
            <h2 className="text-4xl font-bold mb-2 text-center">
                Start with your team
            </h2>
            <p className="text-lg font-medium mb-6 text-[#BBB6B6] text-center">
                Scalpely works with your teammates
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div>
                    <label
                        htmlFor="add_members"
                        className="block text-sm font-medium text-[#BBB6B6] mb-1"
                    >
                        Invite people
                    </label>
                    <input
                        type="email"
                        id="add_members"
                        name="invite_people1"
                        value={formData.invite_people1}
                        onChange={handleInputChange}
                        placeholder="Enter email addresses separated by commas"
                        className="block w-full h-10 mb-4 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        id="add_members"
                        name="invite_people2"
                        value={formData.invite_people2}
                        onChange={handleInputChange}
                        placeholder="Enter email addresses separated by commas"
                        className="block w-full h-10 mb-4 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        id="add_members"
                        name="invite_people3"
                        value={formData.invite_people3}
                        onChange={handleInputChange}
                        placeholder="Enter email addresses separated by commas"
                        className="block w-full h-10 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
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
                        onClick={handleCopyInvite}
                        className="w-full p-2 bg-cyan-700 hover:bg-cyan-500 text-white rounded transition-colors"
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
    const renderBulkInvite = () => (
        <div className="w-full max-w-2xl px-6 py-8 bg-[#1D2A4D] text-white flex flex-col justify-center items-center ">
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 text-cyan-300 hover:text-cyan transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                </svg>
            </button>
            <h2 className="text-4xl font-bold mb-2 text-center">
                Start with your team
            </h2>
            <p className="text-4xl font-medium mb-6 text-[#BBB6B6] text-center">
                Scalpely works with your teammates
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div>
                    <label
                        htmlFor="bulk_invite"
                        className="block text-sm font-medium text-[#BBB6B6] mb-1"
                    >
                        Invite people
                    </label>
                    <textarea
                        id="bulk_invite"
                        name="invite_people1"
                        value={formData.invite_people1}
                        onChange={handleInputChange}
                        placeholder="johndoe@myteam.com, steve@company.com,jackson@company.com..."
                        className="block w-full h-64 pl-3 pr-10 border border-gray-500 shadow-sm text-black rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    />
                                    <p className="text-gray-300 mb-0 text-sm">
  Type or paste in one or multiple emails separated by commas, 
</p>
<p className="text-gray-300 text-sm">spaces, or line breaks.</p>
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleCopyInvite}
                        className="w-full p-2 bg-cyan-700 hover:bg-cyan-500 text-white rounded transition-colors"
                    >
                        Copy invite link
                    </button>
                    <button
                        type="submit"
                        className="w-full p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded transition-colors"
                    >
                        Send Invites
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
                    {currentStep === OnboardSteps.PERSONAL_INFO &&
                        renderPersonalInfo()}
                    {currentStep === OnboardSteps.WORKSPACE &&
                        renderWorkspace()}
                    {currentStep === OnboardSteps.ADD_MEMBERS &&
                        renderAddmembers()}
                    {currentStep === OnboardSteps.BULK_INVITE &&
                        renderBulkInvite()}
                </div>
            </main>
        </>
    );
}
