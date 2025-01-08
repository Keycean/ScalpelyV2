import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // Tracks which menu item is clicked (active)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setActiveMenu(null); // Close all submenus when closing the main menu
    }
  };

  const toggleSubMenu = (index) => {
    // If the menu is already active, close it, otherwise set it as active
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <nav className="bg-cyan-400 text-white fixed w-full top-0 z-50">
      <div className="w-full max-w-7x10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Search Icon */}
          <div className="flex items-center justify-start">
            <button className="focus:outline-none">
              <img className="w-10 h-8" src="/images/search.svg" alt="Search" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center flex-grow">
            <a href="/" className="text-2xl font-bold">
              Scalpely
            </a>
          </div>

          {/* Right: Menu Icon */}
          <div className="relative">
            <button
              className="focus:outline-none flex items-center"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <img className="w-10 h-8" src="/images/close.svg" alt="Close" />
              ) : (
                <img
                  className="w-10 h-8"
                  src="/images/rightmenu.svg"
                  alt="Menu"
                />
              )}
            </button>

            {/* Sidebar Menu */}
            {isMenuOpen && (
              <div className="fixed top-0 right-0 h-screen w-64 bg-cyan-400 text-white">
                <div className="flex flex-col p-4">
                  <button
                    className="self-end text-white mb-4 focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <img
                      className="w-10 h-8"
                      src="/images/close.svg"
                      alt="Close"
                    />
                  </button>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-2 relative">
                    {[
                      {
                        label: "Home",
                        link: "#home",
                        submenu: {
                          title: "Find Care",
                          items: ["Location", "ss", "Login"],
                        },
                      },
                      {
                        label: "Services",
                        link: "#services",
                        submenu: {
                          title: "Our Services",
                          items: ["K", "sin"],
                        },
                      },
                      {
                        label: "Contact",
                        link: "#contact",
                        submenu: {
                          title: "Reach Us",
                          items: ["Los", "Logissn"],
                        },
                      },
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        {/* Main Menu Item */}
                        <a
                          href={item.link}
                          className="flex items-center justify-between px-4 py-2 hover:bg-cyan-600"
                          onMouseEnter={() => setActiveMenu(index)} // Open submenu on hover
                          onClick={() => toggleSubMenu(index)} // Open submenu on click
                        >
                          <img
                            className="w-4 h-4 mr-2"
                            src="/images/chevron-left.svg"
                            alt="Chevron"
                          />
                          <span className="flex-grow text-right">
                            {item.label}
                          </span>
                        </a>

                        {/* Submenu */}
                        {activeMenu === index && (
                          <div
                            className="fixed top-0 right-64 bg-cyan-500 w-64 text-white h-screen"
                            style={{ top: "0px" }}
                          >
                            {/* Submenu Title */}
                            <div className="px-4 py-4 bg-cyan-500 text-lg font-semibold text-center">
                              {item.submenu.title}
                            </div>
                            {/* Submenu Items */}
                            {item.submenu.items.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={`#${subItem.toLowerCase()}`}
                                className="block px-4 py-2 hover:bg-cyan-700 text-right"
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
