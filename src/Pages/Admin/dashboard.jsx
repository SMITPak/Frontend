import { useState, useRef, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

export default function AdminChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "admin", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Emit message
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMessageCircle />
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-80 bg-white shadow-lg rounded-xl overflow-hidden z-50 border border-gray-300 flex flex-col">
          <div className="bg-green-600 text-white px-4 py-2 font-semibold">
            Chat with Admin
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-60 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[70%] px-3 py-2 rounded-lg ${
                  msg.from === "user"
                    ? "bg-green-100 self-end ml-auto text-right"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t border-gray-200">
            <input
              type="text"
              className="flex-1 px-3 py-2 text-sm outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 text-sm"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
