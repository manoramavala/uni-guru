import React, { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

interface ChatContainerProps {
  isSidebarOpen: boolean; // To track if the sidebar is open
}

const ChatContainer: React.FC<ChatContainerProps> = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newMessages: Message[] = [...messages, { text: message, sender: "user" }];
      setMessages(newMessages);
      setMessage("");

      // Simulate bot reply after a short delay
      setTimeout(() => {
        const botMessage = "This is a bot message!";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-white transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 mb-10 w-full max-w-4xl">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded-lg ${msg.sender === "user" ? "ml-auto bg-pink-600 text-right" : "mr-auto bg-pink-700 text-left"}`}
              style={{
                background: msg.sender === "user" 
                ? "#2B1736":"linear-gradient(135deg, #4378A7, #6B5EA5, #7F549D,#696599,#51848E,#3E937B)", // Gradient for user messages
                // : "#2B1736",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "80%", // Limit the width of the message box
                wordWrap: "break-word", // Ensure long words break
                display: "block", // Ensure the messages appear on separate lines
                marginBottom: "10px", // Space between messages
              }}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Input box with Send button */}
      <div className="w-full max-w-4xl px-4 flex items-center space-x-3" style={{
        zIndex:"1"
      }}>
        <textarea
          className="flex-1 p-3 rounded-lg border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white resize-none"
          placeholder="Type a message..."
          value={message}
          onChange={handleMessageChange}
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-2 border border-gray-700 bg-transparent text-white rounded-full hover:bg-gray transition duration-300 focus:outline-none focus:ring-2 focus:ring-white resize-none"   
        >
          Send
        </button>
      </div>

      {/* Message below input */}
      <div className="text-center text-gray-400 mt-2 mb-10 text-sm">
        Guru can make mistakes. Check important info.
      </div>
    </div>
  );
};

export default ChatContainer;
