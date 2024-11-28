import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faGear, faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import uniguru from "../assets/unip-removebg-preview.png";
import userimage from "../assets/userimage.png";

const Navigation: React.FC = () => {
  const [scapperDropdownOpen, setScapperDropdownOpen] = useState(false);
  const [selectModelDropdownOpen, setSelectModelDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false); // New state for Tools dropdown

  const scapperRef = useRef<HTMLDivElement | null>(null);
  const selectModelRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null); // Reference for tools button dropdown

  const toggleScapperDropdown = () => setScapperDropdownOpen((prev) => !prev);
  const toggleSelectModelDropdown = () => setSelectModelDropdownOpen((prev) => !prev);
  const toggleUserDropdown = () => setUserDropdownOpen((prev) => !prev);
  const toggleToolsDropdown = () => setToolsDropdownOpen((prev) => !prev); // Toggle for Tools button

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Close dropdowns when clicking outside
      if (scapperRef.current && !scapperRef.current.contains(target)) {
        setScapperDropdownOpen(false);
      }
      if (selectModelRef.current && !selectModelRef.current.contains(target)) {
        setSelectModelDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsDropdownOpen(false); // Close Tools dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full fixed top-3 z-50">
      <div className="flex items-center justify-between w-full h-25 px-5 sm:px-3">
        <div className="flex items-center space-x-3">
          <img src={uniguru} alt="uni-img" className="w-16 h-auto" />
          <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#896700] via-[#ffbf00] to-[#896700] bg-clip-text">
            UNIGURU
          </p>
        </div>

        <div className="flex items-center space-x-5 relative">
          {/* Tool Button for Small Devices */}
          <div className="relative sm:hidden" ref={toolsRef}>
            <button
              type="button"
              onClick={toggleToolsDropdown} // Toggle only the tools dropdown
              className="border border-gray-700 rounded-3xl text-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black"
            >
              Tools
            </button>
            {/* Tools dropdown menu */}
            {toolsDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-800 text-white rounded shadow-lg py-2 z-50">
                <button
                  onClick={toggleScapperDropdown}
                  className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  Scrapper
                </button>
                <button
                  onClick={toggleSelectModelDropdown}
                  className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  Select Model
                </button>
              </div>
            )}
          </div>

          {/* Select Model Dropdown (Visible on larger screens) */}
          <div className="relative hidden sm:block" ref={selectModelRef}>
            <button
              type="button"
              onClick={toggleSelectModelDropdown}
              className="border border-gray-700 rounded-3xl text-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black"
            >
              Select Model
            </button>
            {selectModelDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-800 text-white rounded shadow-lg py-2 z-50">
                <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
                  Model 1
                </button>
                <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
                  Model 2
                </button>
              </div>
            )}
          </div>

          {/* Scrapper Dropdown (Visible on larger screens) */}
          <div className="relative hidden sm:block" ref={scapperRef}>
            <button
              type="button"
              onClick={toggleScapperDropdown}
              className="border border-gray-700 rounded-3xl text-white px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black"
            >
              Scrap data
            </button>
            {scapperDropdownOpen && (
              <input
                type="text"
                placeholder="Title"
                className="absolute top-full right-0 mt-1 bg-gray-800 text-white rounded shadow-lg py-2 px-2 z-50"
              />
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={userRef}>
            <img
              src={userimage}
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={toggleUserDropdown}
            />
            {userDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-gray-800 text-white rounded shadow-lg py-2 z-50">
                <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
                  Profile
                </button>
                <button className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
