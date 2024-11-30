import React, { useState, useEffect, useRef } from "react";
import uniguru from "../assets/unip-removebg-preview.png";
import userimage from "../assets/userimage.png";

const Navigation: React.FC = () => {
  const [scapperDropdownOpen, setScapperDropdownOpen] = useState(false);
  const [selectModelDropdownOpen, setSelectModelDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [customizeGuruOpen, setCustomizeGuruOpen] = useState(false);

  const scapperRef = useRef<HTMLDivElement | null>(null);
  const selectModelRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const guruBoxRef = useRef<HTMLDivElement | null>(null);

  const toggleScapperDropdown = () => setScapperDropdownOpen((prev) => !prev);
  const toggleSelectModelDropdown = () => setSelectModelDropdownOpen((prev) => !prev);
  const toggleUserDropdown = () => setUserDropdownOpen((prev) => !prev);
  const toggleToolsDropdown = () => setToolsDropdownOpen((prev) => !prev);
  const toggleCustomizeGuru = () => setCustomizeGuruOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
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
        setToolsDropdownOpen(false);
      }
      if (guruBoxRef.current && !guruBoxRef.current.contains(target)) {
        setCustomizeGuruOpen(false);
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
              <div className="absolute top-full right-0 mt-1 bg-gray-800 rounded shadow-lg py-2 z-50">
                <button
                  className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                  onClick={toggleCustomizeGuru}
                >
                  Guru's
                </button>
                <button className="block px-4 py-2 text-red-600 hover:bg-gray-700 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guru Customization Box */}
      {customizeGuruOpen && (
        <div
          ref={guruBoxRef}
          className="absolute top-20 right-5 bg-gray-800 text-white rounded border border-white shadow-lg p-4 z-50 w-72"
        >
          <h3 className="text-lg font-bold mb-3">Customize Guru</h3>
          <div className="mb-2">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Subject</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-end">
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    onClick={() => setCustomizeGuruOpen(false)}
  >
    Create
  </button>
</div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
