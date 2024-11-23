import React from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";

const Chatbox: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

export default Chatbox;
