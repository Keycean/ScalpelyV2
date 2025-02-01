import React from 'react';
import { Link } from '@inertiajs/react';
import { Search, Home, Inbox, Settings, Calendar, Trash2, HelpCircle, UserPlus, Moon } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#40E0D0] text-white">
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#35c5b6]">
          <div className="flex items-center">
            <span className="text-xl font-bold">S</span>
            <span className="ml-2">Scalpely</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-[#35c5b6] rounded p-2">
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
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6]">
            <Home className="h-4 w-4 mr-3" />
            Home
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6]">
            <Inbox className="h-4 w-4 mr-3" />
            Inbox
          </Link>
          
          {/* Projects Section */}
          <div className="px-4 py-2 text-sm font-semibold mt-4">Projects</div>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6] text-sm">
            Getting started
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6] text-sm pl-8">
            No projects yet
          </Link>

          {/* Workspace Section */}
          <div className="px-4 py-2 text-sm font-semibold mt-4">Workspaces</div>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6] text-sm">
            Scalpely HQ
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6] text-sm">
            Preferences
          </Link>

          {/* Additional Links */}
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6] mt-4">
            <Calendar className="h-4 w-4 mr-3" />
            Calendar
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6]">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6]">
            <Trash2 className="h-4 w-4 mr-3" />
            Trash
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 hover:bg-[#35c5b6]">
            <HelpCircle className="h-4 w-4 mr-3" />
            Help
          </Link>
        </nav>

        {/* Invite Members Button */}
        <div className="absolute bottom-0 left-0 w-64 p-4">
          <button className="flex items-center justify-center w-full bg-[#35c5b6] text-white py-2 px-4 rounded">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite members
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="flex justify-end p-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Moon className="h-5 w-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Recently Visited Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recently visited</h2>
            <div className="grid grid-cols-4 gap-4">
              {['Preferences', 'Marketplace', 'Inbox', 'Home'].map((item) => (
                <div key={item} className="bg-navy-blue p-4 rounded-lg text-white">
                  <div className="w-16 h-16 bg-[#1a237e] rounded-lg mb-2"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Upcoming events</h2>
            <div className="bg-gray-200 h-32 rounded-lg"></div>
          </div>

          {/* Featured Templates Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Featured templates</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-navy-blue p-4 rounded-lg text-white">
                  <div className="w-16 h-16 bg-[#1a237e] rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}