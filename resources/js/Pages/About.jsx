import React from 'react'

const About = () => {
  return (
    <div>
        {/* Schedule Section */}
        <div className=" bg-gray-200 py-10 text-center min-h-[30vh] ">
                <h3 className="text-4xl  mb-0 text-center">A HEALTHIER YOU STARTS HERE</h3>
                <h3 className="text-4xl  mb-8 text-center">MAKE AN APPOINTMENT NOW</h3>
                <p className="mb-0 text-2xl text-center">
                    Need a primary care or pharmacy appointment? Use self-scheduling to book online 
                </p>
                <p className="mb-12 text-2xl  text-center">quickly! 
                Find available times and manage your health on your schedule.</p>
                <button className=" w-100 bg-transparent  border-solid border-2 border-cyan-500 text-black py-2 px-20  hover:bg-cyan-600">
                    Schedule an Appointment
                </button>
            </div>
    </div>
  )
}

export default About
