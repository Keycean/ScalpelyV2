import React, { useState, useEffect} from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setActiveMenu(null);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setSearchValue('');
    }
  };

  const toggleSubMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Searching for:', searchValue);
    // Add your search logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <nav className={`fixed w-full text-white top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-cyan-400 " : "bg-transparent"
      }`}>
        <div className="w-full max-w-7x10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Search Icon */}
            <div className="flex items-center justify-start">
              <button 
                className="focus:outline-none p-2 h-20  transition-all duration-300 hover:bg-cyan-400 active:bg-cyan-600" 
                onClick={toggleSearch}
              >
                <img 
                  className="w-10 h-8" 
                  src={isSearchOpen ? "/images/close.svg" : "/images/search.svg"} 
                  alt={isSearchOpen ? "Close Search" : "Search"} 
                />
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
                className="focus:outline-none flex items-center p-2 rounded-full transition-all duration-300 hover:bg-cyan-500 active:bg-cyan-600"
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
                      className="self-end text-white mb-4 focus:outline-none p-2 rounded-full transition-all duration-300 hover:bg-cyan-500 active:bg-cyan-600"
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
                          <a
                            href={item.link}
                            className="flex items-center justify-between px-4 py-2 hover:bg-cyan-600"
                            onMouseEnter={() => setActiveMenu(index)}
                            onClick={() => toggleSubMenu(index)}
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

                          {activeMenu === index && (
                            <div
                              className="fixed top-0 right-64 bg-cyan-500 w-64 text-white h-screen"
                              style={{ top: "0px" }}
                            >
                              <div className="px-4 py-4 bg-cyan-500 text-lg font-semibold text-center">
                                {item.submenu.title}
                              </div>
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
      
      {/* Search Bar */}
      {isSearchOpen && (
        <div className="fixed w-auto bg-cyan-400 top-16 z-40 transition-all duration-300 ease-in-out shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow px-4 py-2 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Search
              </button>
          
            </div>
            <div className="flex gap-8">
            <button className="flex-grow">    Find a Doctor</button>
            <button  className="flex-grow">    Find a Doctor</button>
            <button  className="flex-grow">    Find a Doctor</button>
            <button className="flex-grow">    Find a Doctor</button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;