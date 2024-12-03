import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faGear, faEllipsis, faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [activeConversation, setActiveConversation] = useState<number | null>(0); // Keep conversation open by default
  const [activeEllipsis, setActiveEllipsis] = useState<number | null>(null);
  const [ellipsisPosition, setEllipsisPosition] = useState<{ top: number; left: number } | null>(null);
  const ellipsisRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close ellipsis options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        activeEllipsis !== null &&
        !ellipsisRefs.current.some(
          (ref, index) => ref && ref.contains(target) && activeEllipsis === index
        )
      ) {
        setActiveEllipsis(null);
        setEllipsisPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEllipsis]);

  const handleEllipsisClick = (event: React.MouseEvent, index: number) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setEllipsisPosition({
      top: rect.top + window.scrollY,  // Get the top position of the button relative to the document
      left: rect.left + window.scrollX, // Get the left position of the button relative to the document
    });
    setActiveEllipsis(index);
  };

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
          {/* New Chat Button */}
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

          {/* Conversations List */}
          {activeConversation !== null && (
            <div className="mt-2 bg-gray-800 rounded p-3">
              <ul className="text-sm">
                {[...Array(3)].map((_, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-700 p-2 rounded cursor-pointer flex justify-between items-center"
                  >
                    <span>Conversation {index + 1}</span>
                    <button
                      onClick={(event) => handleEllipsisClick(event, index)}
                      className="text-white hover:text-gray-400 ml-2"
                    >
                      <FontAwesomeIcon icon={faEllipsis} size="lg" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ellipsis Options (Edit/Delete) */}
          {activeEllipsis !== null && ellipsisPosition && (
            <div
              ref={(ref) => (ellipsisRefs.current[activeEllipsis] = ref)}
              className="absolute bg-gray-800 h-20 w-15 rounded p-2 z-50 border border-white"
              style={{
                top: ellipsisPosition.top - 100,  // Adjust for dropdown placement
                left: ellipsisPosition.left + 50, // Align it next to the ellipsis button
                maxHeight: "calc(100vh - 100px)", // Ensure it doesn’t go beyond the screen height
              }}
            >
              <ul>
                <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faPen} size="lg" />
                  <span>Edit</span>
                </li>
                <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                  <span>Delete</span>
                </li>
              </ul>
            </div>
          )}

          {/* Settings */}
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
