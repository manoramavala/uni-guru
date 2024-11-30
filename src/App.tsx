import React, { useState } from "react";
import Sidebar from "./Component/Sidebar";
import ChatContainer from "./Component/ChatContainer";
import Navigation from "./Component/Navigation";
import "./index.css";
import StarsCanvas from "../main/StarBackground";


const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <div className="flex flex-col h-screen bg-[#1B0725]">
      <StarsCanvas />
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex mt-20 h-[calc(100%-5rem)]" >
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Chat Container */}
        <div
      className={`flex-1 overflow-hidden transition-all duration-300 ${
        isSidebarOpen ? "w-[calc(100%-16rem)]" : "w-full"
      }`}
    >
      <ChatContainer />
    </div>
      </div>
    </div>
  );
};

export default App;
