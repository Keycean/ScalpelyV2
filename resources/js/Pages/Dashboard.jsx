import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Search, Home, Inbox, Settings, Calendar, Trash2, HelpCircle, UserPlus, Moon, Sun } from 'lucide-react';

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-[#13C5DD]'} text-white`}>
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-4 border-b border-opacity-20">
          <div className="flex items-center">
            <span className="text-xl font-bold">S</span>
            <span className="ml-2">Scalpely</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className={`flex items-center rounded p-2 ${isDarkMode ? 'bg-transparent' : 'bg-[#13C5DD]'}`}>
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none focus:outline-none ml-2 w-full text-white placeholder-white"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          {/* Navigation items with dark mode aware hover states */}
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Home' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Home')}
          >
            <Home className="h-4 w-4 mr-3" />
            Home
          </Link>
          
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Inbox' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Inbox')}
          >
            <Inbox className="h-4 w-4 mr-3" />
            Inbox
          </Link>

          {/* Projects Section */}
          <div className="px-4 py-2 text-sm font-semibold mt-4">Private</div>
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
              activeLink === 'Getting started' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Getting started')}
          >
            Getting started
          </Link>

          {/* TeamSpaces Section */}
          <div className="px-4 py-2 text-sm font-semibold mt-4">Teamspaces</div>
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
              activeLink === 'Getting started' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Getting started')}
          >
            Scalpely HQ
          </Link>
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
              activeLink === 'Getting started' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Getting started')}
          >
            Preferences
          </Link>

          {/* Additional Links */}

          
          {/* Calendar */}
          <Link 
            href="#" 
            className={`flex items-center mt-16 px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Calendar' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Calendar')}
          >
            <Calendar className="h-4 w-4 mr-3" />
            Calendar
          </Link>
          {/* Settings */}
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Settings' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Settings')}
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Link>
            {/* Trash */}
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Trash' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Trash')}
          >
            <Trash2 className="h-4 w-4 mr-3" />
            Trash
          </Link>
          {/* Help */}
          <Link 
            href="#" 
            className={`flex items-center px-4 py-2 transition-colors duration-200 ${
              activeLink === 'Help' 
                ? isDarkMode ? 'bg-gray-700' : 'bg-[#1D2A4D]'
                : ''
            } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-[#1D2A4D]'}`}
            onClick={() => handleLinkClick('Help')}
          >
            <HelpCircle className="h-4 w-4 mr-3" />
            Help
          </Link>
        </nav>

        {/* Invite Members Button */}
        <div className="absolute bottom-0 left-0 w-64 p-4">
          <button className={`flex items-center justify-center w-full bg-transparent ${isDarkMode ? 'bg-transparent ' : 'bg-[#1D2A4D]'} text-white py-2 px-4 rounded`}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite members
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="flex justify-end p-4">
          <button 
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200'}`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-4xl mx-auto p-6">
          {/* Recently Visited Section */}
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recently visited
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {['Preferences', 'Marketplace', 'Inbox', 'Home'].map((item) => (
                <div key={item} className={`p-4 rounded-lg text-white h-40 relative ${isDarkMode ? 'bg-gray-800' : 'bg-[#1D2A4D]'}`}>
                  <div className="absolute top-2 left-2 text-sm text-gray-300">
                    32 min ago
                  </div>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xl font-semibold">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming events
            </h2>
            <div className={`h-48 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-[#1D2A4D]'}`}></div>
          </div>

          {/* Templates Section */}
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Templates
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {['Preferences', 'Products', 'To-do-list', 'Home'].map((item) => (
                <div key={item} className={`p-4 rounded-lg text-white h-40 relative ${isDarkMode ? 'bg-gray-800' : 'bg-[#1D2A4D]'}`}>
                  <div className="absolute top-2 left-2 text-sm text-gray-300">
                    32 min ago
                  </div>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xl font-semibold">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}