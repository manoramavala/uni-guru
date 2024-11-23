import React from "react";
import uniguru from '../assets/unip-removebg-preview.png';

const Navigation: React.FC = () => {
  return (
    <div className="w-full fixed top-0 z-50 bg-transparent">
      <div className="flex items-center justify-between w-full h-25 px-5">
        <div className="flex items-center">
          <img src={uniguru} alt="uni-img" className="w-16 h-auto mr-2" /> {/* Adjusted image size */}
          <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#896700] via-[#ffbf00] to-[#896700] bg-clip-text">
            UNIGURU
          </p>
        </div>

        {/* <div className="flex space-x-5">
          <button
            type="submit"
            className="border border-white text-white px-4 py-2 rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Login
          </button>
          <button
            type="submit"
            className="border border-white text-white px-4 py-2 rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Sign up
          </button> 
        </div>*/}
      </div>
    </div>
  );
};

export default Navigation;


