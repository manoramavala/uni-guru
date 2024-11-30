import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faGear,
  faEllipsis,
  faPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeEllipsis, setActiveEllipsis] = useState<number | null>(null);
  const ellipsisRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isDropdownOpen &&
        !document.querySelector(".select-guru-dropdown")?.contains(target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isHistoryOpen &&
        !document.querySelector(".history-dropdown")?.contains(target)
      ) {
        setIsHistoryOpen(false);
      }

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
        className="fixed top-20 left-5 z-50 p-3 rounded-full"
      >
        {isSidebarOpen ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
            size="lg"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-gray-400 hover:text-white transition duration-300"
            size="lg"
          />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[5rem] left-0 h-[calc(100%-5rem)] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40 w-64 flex flex-col`}
        style={{
          backgroundColor: isSmallScreen ? "rgba(50, 39, 59, 1)" : "rgba(50, 39, 59, 0.2)",
        }}
      >
        <ul className="flex flex-col gap-4 p-5 flex-grow text-white">
          
          <div className="relative">
          <button
    className="bg-blue-900 hover:bg-blue-800 p-3 rounded cursor-pointer w-full flex items-center justify-between mt-7"
  >
    <span>New Chat</span>
    <FontAwesomeIcon
      icon={faPlus}
      className="text-gray-400 hover:text-white transition duration-300 ml-2"
      size="lg"
    />
  </button>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-black hover:bg-gray-700 p-3 rounded cursor-pointer w-full text-left mt-7"
            >
              Select Guru
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-gray-800 rounded mt-1 w-full z-50 select-guru-dropdown">
                <ul>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 1</li>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 2</li>
                  <li className="hover:bg-gray-700 p-3 rounded cursor-pointer">Guru 3</li>
                </ul>
              </div>
            )}
          </div>
          {/* History */}
          <div className="relative">
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
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
                      <span>Conversation {index + 1}</span>
                      <button
                        onClick={() => setActiveEllipsis(index)}
                        className="text-white hover:text-gray-400 ml-2"
                      >
                        <FontAwesomeIcon icon={faEllipsis} size="lg" />
                      </button>
                      {activeEllipsis === index && (
                        <div
                          ref={(ref) => (ellipsisRefs.current[index] = ref)}
                          className="absolute right-0 mt-2 bg-gray-800 rounded p-2 z-50 border border-[#ffffff]"
                        >
                          <ul>
                            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                              <FontAwesomeIcon icon={faPen} size="lg" /> Edit
                            </li>
                            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
                              <FontAwesomeIcon icon={faTrash} size="lg" /> Delete
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
          <div className="mt-auto mb-4 text-center hover:bg-gray-700 p-3 rounded cursor-pointer text-white">
            <FontAwesomeIcon icon={faGear} size="lg" />
            Settings
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
