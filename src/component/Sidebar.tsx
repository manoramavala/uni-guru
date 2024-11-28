import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faGear,
  faEllipsis,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isSidebarOpen: boolean; // State of the sidebar from the parent component
  toggleSidebar: () => void; // Function to toggle the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For "Select Guru"
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // For "History"
  const [activeEllipsis, setActiveEllipsis] = useState<number | null>(null); // For individual ellipses
  const ellipsisRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle resize events to check if the screen is small
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle Select Guru Dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Toggle History Section
  const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

  // Toggle individual ellipsis dropdown
  const toggleEllipsis = (index: number) => {
    setActiveEllipsis((prevIndex) => (prevIndex === index ? null : index));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close Select Guru Dropdown
      if (
        isDropdownOpen &&
        !document.querySelector(".select-guru-dropdown")?.contains(target)
      ) {
        setIsDropdownOpen(false);
      }

      // Close History Dropdown
      if (
        isHistoryOpen &&
        !document.querySelector(".history-dropdown")?.contains(target)
      ) {
        setIsHistoryOpen(false);
      }

      // Close Ellipsis Dropdown
      if (
        activeEllipsis !== null &&
        !ellipsisRefs.current.some(
          (ref, index) => ref && ref.contains(target) && activeEllipsis === index
        )
      ) {
        setActiveEllipsis(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isHistoryOpen, activeEllipsis]);

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
        className={`sidebar fixed top-[5rem] left-0 h-[calc(100%-5rem)] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 w-64 flex flex-col`}
        style={{
          backgroundColor:
            isSmallScreen && isSidebarOpen
              ? "rgba(50, 39, 59, 1)" // Full opacity on small screens when sidebar is open
              : "rgba(50, 39, 59, 0.2)", // Default semi-transparent background
        }}
      >
        {/* Sidebar Menu */}
        <ul className="flex flex-col gap-4 p-5 flex-grow text-white">
          {/* Select Guru Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-black hover:bg-gray-700 p-3 rounded cursor-pointer w-full text-left mt-7"
            >
              Select Guru
            </button>
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 bg-gray-800 rounded mt-1 w-full z-50 select-guru-dropdown"
              >
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
              <div className="mt-2 bg-gray-800 rounded p-3 history-dropdown">
                <ul className="text-sm">
                  {[...Array(3)].map((_, index) => (
                    <li
                      key={index}
                      className="hover:bg-gray-700 p-2 rounded cursor-pointer flex justify-between items-center"
                    >
                      {/* Conversation Title */}
                      <span>Conversation {index + 1}</span>

                      {/* Ellipsis Button */}
                      <button
                        onClick={() => toggleEllipsis(index)}
                        className="text-white hover:text-gray-400 ml-2"
                      >
                        <FontAwesomeIcon icon={faEllipsis} size="lg" />
                      </button>

                      {/* Ellipsis Dropdown */}
                      {activeEllipsis === index && (
                        <div
                          ref={(ref) => (ellipsisRefs.current[index] = ref)}
                          className="absolute right-0 mt-2 bg-gray-800 rounded p-2 z-50 border border-[#ffffff]"
                        >
                          <ul>
                            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                              <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                                style={{ color: "#ffffff" }}
                              />{" "}
                              Edit
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                              <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                style={{ color: "#ffffff" }}
                              />{" "}
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="mt-auto mb-4 text-center hover:bg-gray-700 p-3 rounded cursor-pointer text-white">
            <FontAwesomeIcon icon={faGear} size="lg" style={{ color: "#ffffff" }} />
            Settings
          </div>
        </ul>
      </div>

      {/* CSS Media Queries */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            background-color: rgba(50, 39, 59, 1) !important; /* Full opacity for small screens */
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
