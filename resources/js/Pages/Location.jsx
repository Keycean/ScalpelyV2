import React from 'react';
import Healthcares from '../Sub/Healthcares';

const Location = () => {
  return (
    <div className="bg-white py-10 flex flex-col items-center min-h-[30vh]">
      {/* Text and Map Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="flex flex-col justify-center items-start px-6 md:ml-20 md:space-y-4">
          <p className="text-left text-2xl md:text-4xl">WHERE YOUR FAMILY CAN</p>
          <p className="text-left text-2xl md:text-4xl">TURN TO THE EXPERTS</p>
          <button className="w-full md:w-60 bg-transparent shadow-lg border-solid border-2 border-cyan-500 text-black py-2 px-4 rounded-lg hover:bg-cyan-600 mt-4 md:mt-0">
            View All Locations
          </button>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/2 px-6 md:px-20 mt-6 md:mt-0">
          <img
            src="images/map.png" // Replace with your map image URL
            alt="Map"
            className="rounded-lg w-full h-auto"
          />
        </div>
      </div>

      {/* Healthcares Section */}
      <div className="w-full mt-10">
        <Healthcares />
      </div>
    </div>
  );
};

export default Location;
