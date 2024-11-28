import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faArrowUp, faPen, faCopy, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import uniguru from "../assets/unip-removebg-preview.png";
import userimage from "../assets/userimage.png";

const ChatContainer: React.FC<ChatContainerProps> = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessages: Message[] = [...messages, { text: message, sender: "user" }];
      setMessages(newMessages);
      setMessage("");

      setTimeout(() => {
        const botMessage = "This is a bot message!";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    
      <div
        className={`flex flex-col items-center justify-between h-full text-white transition-all duration-300 ${
          isSidebarOpen ? "ml-0 sm:ml-64" : "ml-0"
        }`}
        style={{
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {/* Chat messages */}
        <div
          className="flex-1 mb-4 w-full max-w-3xl flex flex-col gap-4"
          style={{
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
            zIndex: isSidebarOpen ? "10" : "0", // Ensure it overlaps correctly
            scrollbarWidth: "none", // Disable scrollbar in Firefox
            msOverflowStyle: "none", // Disable scrollbar in IE and Edge
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
                style={{
                  width: "100%",
                }}
              >
                {/* Bot's Image Always on Left */}
                {msg.sender === "bot" && (
                  <img
                    src={uniguru}
                    alt="Bot Logo"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                )}
    
                {/* Message Text */}
                <div
                  className={`px-4 py-2 rounded-lg relative flex items-center ${
                    msg.sender === "user"
                      ? "bg-[linear-gradient(135deg,_#61ACEF,_#9987ED,_#B679E1,_#9791DB,_#74BDCC,_#59D2BF)] text-black"
                      : "border border-gray-700 text-white"
                  }`}
                  style={{
                    display: "inline-block",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word", // Prevent long text issues
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", // Align messages properly
                    marginTop: "15px",
                  }}
                >
                  {msg.text}
                  {/* Icons for Bot Message */}
                  {msg.sender === "bot" && (
                    <div className="absolute bottom-[-20px] right-0 flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faVolumeHigh}
                        className="text-[#ffffff] cursor-pointer hover:text-gray-400"
                      />
                      <FontAwesomeIcon
                        icon={faCopy}
                        className="text-[#ffffff] cursor-pointer hover:text-gray-400"
                      />
                    </div>
                  )}
                  {/* Pen Icon for User Message */}
                  {msg.sender === "user" && (
                    <FontAwesomeIcon
                      icon={faPen}
                      className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 text-[#ffffff] cursor-pointer hover:text-gray-400"
                    />
                  )}
                </div>
    
                {/* User's Image on Right */}
                {msg.sender === "user" && (
                  <img
                    src={userimage}
                    alt="User"
                    className="w-8 h-8 rounded-full ml-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 mt-5 ml-10">No messages yet. Start the conversation!</p>
          )}
          {/* Dummy element for scrolling */}
          <div ref={messagesEndRef} />
        </div>
    
        {/* Input box with icons and Send button */}
        <div className="w-full max-w-3xl px-4 flex items-center relative">
          <div className="flex items-center w-full border border-gray-700 rounded-3xl bg-transparent px-4">
            <FontAwesomeIcon
              icon={faPaperclip}
              className="mx-4 cursor-pointer text-gray-400 hover:text-white transition duration-300"
            />
            <textarea
              className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
              placeholder="Type a message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              className="mx-4 cursor-pointer text-gray-400 hover:text-white transition duration-300"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="ml-3 py-2 px-4 border border-gray-700 bg-transparent text-white rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
    
        <div className="text-center text-gray-400 mt-2 mb-10 text-sm">
          Guru can make mistakes. Check important info.
        </div>
      </div>
    );
    
};

export default ChatContainer;
