import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1D2A4D] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Column 1 */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">PATIENTS & VISITORS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Appointment</a></li>
              <li><a href="#" className="hover:underline">General Information</a></li>
              <li><a href="#" className="hover:underline">New Patients</a></li>
              <li><a href="#" className="hover:underline">Price Transparency</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Your Visit</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">For the Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Appointment</a></li>
              <li><a href="#" className="hover:underline">General Information</a></li>
              <li><a href="#" className="hover:underline">New Patients</a></li>
              <li><a href="#" className="hover:underline">Price Transparency</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Your Visit</a></li>
            </ul>
          </div>

          {/* Column 3 with Follow Us Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Appointment</a></li>
              <li><a href="#" className="hover:underline">General Information</a></li>
              <li><a href="#" className="hover:underline">New Patients</a></li>
              <li><a href="#" className="hover:underline">Price Transparency</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Your Visit</a></li>
            </ul>

            {/* Follow Us Section */}
            <div className="mt-6">
              <p className="font-semibold text-lg mb-2">Follow Us</p>
              <div className="flex space-x-4">
                <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
                <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
                <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
                <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-16 text-sm">
          Copyright Scaleply 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
