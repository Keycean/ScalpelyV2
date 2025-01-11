import React from 'react';

const Experience = () => {
  return (
    <div className="bg-white py-10 flex flex-col items-center min-h-[30vh]">
      {/* Main Content Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/3 px-6 md:px-10 mt-6 md:mt-0">
          <img
            src="images/map.png" // Replace with your image URL
            alt="Experience Image"
            className="rounded-lg w-full h-auto shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start px-6 md:px-20 space-y-4">
          <h3 className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            THE PH HEALTHCARE
          </h3>
          <div className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            EXPERIENCE
          </div>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Planning your Visit
          </p>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Planning your Visit
          </p>
          <p className="text-lg text-gray-700 text-center md:text-left">
            Planning your Visit
          </p>
          <p className="text-lg text-gray-700 text-center md:text-left  ">
            Planning your Visit
          </p>
          
          <button className="w-full md:w-60 bg-transparent shadow-lg border-solid border-2 border-cyan-500 text-black py-2 px-4 rounded-lg hover:bg-cyan-600">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
