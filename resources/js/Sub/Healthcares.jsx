import React from 'react';

const Healthcares = () => {
  const healthcareItems = [
    { img: "images/hospital1.png", label: "Hospital" },
    { img: "images/hospital2.png", label: "Center" },
    { img: "images/placeholder.png", label: "Center" },
    { img: "images/placeholder.png", label: "Institute" },
    { img: "images/placeholder.png", label: "Institute" },
    { img: "images/placeholder.png", label: "Institute" },
    { img: "images/placeholder.png", label: "Institute" },
  ];

  return (
    <div className="w-full mt-10 flex flex-wrap justify-center gap-8">
      {healthcareItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-solid border-2 border-cyan-400 overflow-hidden shadow-lg">
            <img
              src={item.img} // Replace with actual image paths
              alt={item.label}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm md:text-base">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Healthcares;
