import React, {useState} from "react";
import { useForm, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";


export default function Login() {
    const [showVerification, setShowVerification] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        code: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!showVerification) {
            // Send verification code
            try {
                const response = await fetch('/auth/send-verification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({ email: data.email })
                });

                if (response.ok) {
                    setShowVerification(true);
                }
            } catch (error) {
                console.error('Error sending verification code:', error);
            }
        } else {
            // Verify code and login
            router.post('/verify-code', data,);
        }
    };
    


    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel */}
            <div className="w-full md:w-1/2 bg-[#1D2A4D] p-4 md:p-8 flex flex-col items-center justify-center min-h-[40vh] md:min-h-screen">
                <div className="mb-8 md:mb-32">
                    <div className="max-w-[200px] md:max-w-96 h-auto md:h-32 rounded-full flex items-center justify-center">
                        <img
                            src="images/logo.png"
                            alt="Logo"
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                </div>
                <h1 className="text-[#39c4e3] text-4xl md:text-6xl font-hard mb-4 md:mb-8">
                    SCALPELY
                </h1>
                <p className="text-white text-lg md:text-xl text-center">
                    "The Greatest Wealth is to be Healthy"
                </p>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 bg-white p-4 md:p-8">
                <div className="w-full max-w-md mx-auto pt-8">
                    <Link href="/" className="inline-block mb-16 text-gray-600 flex items-center ">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Go back
                    </Link>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                        Log in to your Scalpely Account
                    </h2>
                    <p className="text2xl text-center text-gray-800 ">Login to manage your account</p>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mt-8">
                        <button 
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => window.location.href = route('google-auth')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <button 
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => window.location.href = route('apple-auth')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.087 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address..."
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#39c4e3] focus:border-[#39c4e3]"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                disabled={showVerification}
                            />
                            {errors.email && (
                                <div className="mt-1 text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                            <p className="mt-1 text-xs text-gray-500">Use an organization email to easily collaborate with  teammates.</p>
                        </div>
                        {showVerification && (
                            <div className="mt-4">
                                <label className="block text-sm text-gray-600 mb-1">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit code"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#39c4e3] focus:border-[#39c4e3]"
                                    value={data.code}
                                    onChange={(e) => setData("code", e.target.value)}
                                    maxLength={6}
                                    pattern="[0-9]{6}"
                                />
                                {errors.code && (
                                    <div className="mt-1 text-red-500 text-sm">
                                        {errors.code}
                                    </div>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                    Didn't receive the code?{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleSubmit}
                                        className="text-[#39c4e3] hover:text-[#33b3d1]"
                                    >
                                        Resend
                                    </button>
                                </p>
                            </div>
                        )}


<button
                            type="submit" 
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#39c4e3] hover:bg-[#33b3d1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39c4e3] mt-4"
                        >
                            {showVerification ? "Verify & Login" : "Continue"}
                        </button>
                            
                        <div className="text-center mt-4">
                            <span className="text-gray-600 text-sm">Don't have an account? </span>
                            <Link href="/register" className="text-[#39c4e3] hover:text-[#33b3d1] text-sm">
                                Create new account
                            </Link>
                        </div>
                         <p className="text-xs text-gray-500 text-center mt-6">
                                                    Your name and profile picture will be visible to individuals who send you workspace invitations using your email address. By proceeding, you confirm that you have read, understood, and agreed to our 
                                                    <Link href="term" className="text-[#39c4e3] hover:text-[#33b3d1]"> Terms of Service </Link>
                                                    and 
                                                    <Link href="policy" className="text-[#39c4e3] hover:text-[#33b3d1]"> Privacy Policy</Link>.
                                                </p>
                    </form>
                </div>
            </div>
        </div>
    );
}