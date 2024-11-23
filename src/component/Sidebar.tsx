import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import correct icons

interface SidebarProps {
  isSidebarOpen: boolean; // State of the sidebar from the parent component
  toggleSidebar: () => void; // Function to toggle the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-20 left-5 z-50 p-3 text-white hover:text-gray-700 rounded-full"
      >
        {isSidebarOpen ? (
          <FontAwesomeIcon icon={faTimes} size="lg" style={{ color: "#ffffff" }} />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" style={{ color: "#ffffff" }} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[5rem] left-0 h-[calc(100%-5rem)] bg-transparent border-r-1 border-white text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 w-64 flex flex-col`}
        style={{ position: "fixed" }}
      >
        {/* Sidebar Menu */}
        <ul className="flex flex-col gap-4 p-5 flex-grow">
          {/* Select Guru Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-black hover:bg-gray-700 p-3 rounded cursor-pointer w-full text-left mt-5"
            >
              Select Guru
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-gray-800 rounded mt-1 w-full z-50">
                <ul>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 1</li>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 2</li>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="relative">
            <button
              onClick={toggleHistory}
              className="bg-black hover:bg-gray-700 p-3 rounded cursor-pointer w-full text-left"
            >
              History
            </button>
            {isHistoryOpen && (
              <div className="mt-2 bg-gray-800 rounded p-3">
                <ul className="text-sm">
                  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Conversation 1</li>
                  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Conversation 2</li>
                  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Conversation 3</li>
                </ul>
              </div>
            )}
          </div>
        </ul>

        {/* Settings at the Bottom */}
        <div className="mt-auto text-center hover:bg-gray-700 p-3 rounded cursor-pointer">
          Settings
        </div>
      </div>
    </>
  );
};

export default Sidebar;
