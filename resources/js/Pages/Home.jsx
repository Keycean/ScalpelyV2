import React from 'react';  

const Home = () => {
    return (
        <div className="homepage">
            {/* Combined Hero and Main Section */}
            <div 
                className="hero bg-cover bg-center relative text-center min-h-[90vh] flex items-center justify-center" 
                style={{ backgroundImage: "url('images/bg-scal.jpg')" }}
            >
                {/* Overlay for the background */}
                <div className="overlay bg-black bg-opacity-20 absolute inset-0"></div>
                
                {/* Content on top of the background */}
                <div className="content relative z-10 flex flex-col justify-between h-full w-full">
                    {/* Hero Text */}
                    <div className="text-white mb-10 mt-10 px-6">
                        <h2 className="text-5xl font-bold text-cyan-400 mb-4 text-left">Welcome to Scalpely</h2>
                        <p className="text-4xl text-left">Best Healthcare Solution</p>
                        <p className="text-3xl text-left">In Your City</p>
                    </div>

                    {/* Main Section Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto   bg-transparent p-6 mb-10">
                        <div className="card rounded-lg p-6 text-center bg-transparent">
                            <h3 className="text-xl  text-left text-white ">FIND ONE OF OUR </h3>
                            <p className="text-xl font-bold  text-left text-white mb-3 ">DOCTORS</p>
                            <button className=" w-60 bg-transparent  shadow-lg border-solid border-2 border-white-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600">
                               FIND A DOCTOR
                            </button>
                        </div>
                        <div className="card rounded-lg p-6 text-center bg-transparent">
                            <h3 className="text-xl  text-left text-white ">SCHEDULE AN </h3>
                            <p className="text-xl font-bold  text-left text-white mb-3">APPOINTMENT</p>
                            <button className=" w-60 bg-transparent  shadow-lg border-solid border-2 border-white-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600">
                               REQUEST APPOINTMENT
                            </button>
                        </div>
                        <div className="card rounded-lg p-6 text-center bg-transparent">
                            <h3 className="text-xl  text-left text-white">LOG IN TO</h3>
                            <p className="text-xl font-bold  text-left text-white mb-3">DASHBOARD</p>
                            <button className=" w-60 bg-transparent  shadow-lg border-solid border-2 border-white-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600">
                               LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>

          
        </div>
    );
};

export default Home;
