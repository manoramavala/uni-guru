import React from "react";
import uniguru from '../assets/unip-removebg-preview.png';

const Navigation: React.FC = () => {
  return (
    <div className="navigation-bar-wrapper">

    <div className="navigation-bar flex items-center justify-between w-full h-24 px-5">

      <div className="logo flex items-center">
        <img src={uniguru} alt="uni-img" className="uni-img w-12 mr-2" /> 
        <p className="Uniguru text-3xl font-bold text-yellow-500">UniGuru</p>
      </div>

      <div className="nav-btn flex space-x-5">

        <button type="submit" className="nav-login-btn border border-white text-white px-4 py-2 rounded">
          Login
        </button>

        <button type="submit" className="nav-Signup-btn border border-white text-white px-4 py-2 rounded">
          Sign up
        </button>
        
      </div>
    </div>
  </div>
  
  );
};

export default Navigation;
