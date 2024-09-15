import React, { useEffect, useRef, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { FaArrowUp } from "react-icons/fa";

const API_KEY =
  "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";

const OR = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatbox = messagesEndRef.current.parentNode; // Get the chatbox container
      chatbox.scrollTop = chatbox.scrollHeight; // Scroll only within the chatbox
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      message: inputMessage,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    // Update the state
    setMessages(newMessages);
    setInputMessage("");
    setIsSending(true);
    setTyping(true);

    // Send message to ChatGPT and wait for a response
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setTyping(false);
        setIsSending(false);
      });
  }

  return (
    <div className="relative min-h-screen overflow-y-scroll no-scrollbar text-white antialiased selection:bg-rose-300 selection:text-rose-800">
      <div className="fixed top-0 -z-5 h-full w-full">
        <ParticlesBackground />
      </div>
      <div className="absolute -z-10 min-h-full w-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee]"></div>
      <div className="flex items-start justify-center">
        <h3 className="uppercase tracking-[20px] text-fuchsia-600 text-2xl mt-[120px] ml-6">
          Operation Room
        </h3>
      </div>
      <div className="flex flex-wrap mt-[100px]">
        <div className="w-1/2">
          <div className="flex justify-center items-center mb-10 ml-[92px]">
            <span className="text-2xl my-custom-font font-[10px] tracking-tighter text-fuchsia-600">
              Clarifying Questions
            </span>
          </div>
          <div className="flex justify-end">
            <div className="box-border h-[800px] w-[700px] border-[4px] border-pink-300 hover:border-pink-500 transition-colors duration-300 rounded-[1.25rem] bg-white/50 hover:bg-slate-100 flex flex-col mb-[40px]">
              {/* <div className = "h-1/10 flex items-center justify-center border-b-[2px]">
              <div className = "text-black text-2xl text-center">
                bro
              </div>
            </div> */}
              {/* Message List */}
              <div className="h-4/5 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${
                      message.direction === "incoming"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`${
                        message.direction === "incoming"
                          ? "bg-[#E5E5EA] text-black"
                          : "bg-pink-500 text-white"
                      } p-3 rounded-[1.25rem] max-w-lg shadow-lg`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-[#E5E5EA] text-black p-3 rounded-[1.25rem] max-w-xs shadow-lg">
                      ChatGPT is typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Text Input */}
              <div className="h-1/5 px-4 py-4 flex justify-center items-center">
                <div className="flex w-[95%] h-[100%] resize-none rounded-[1.25rem] border-[2px] border-pink-300 bg-white hover:border-pink-500 focus:outline-none transition-colors duration-300">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-[92%] px-3 py-3 text-md rounded-[1.25rem] focus:bg-white focus:text-black focus:outline-none overflow-y-scroll no-scrollbar resize-none"
                    placeholder="Type your message..."
                    rows="4"
                  >
                    <text className="flex justify-end"></text>
                  </textarea>
                  <div className="flex py-3 items-start justify-end w-[8%] mr-3">
                    <button
                      className={`rounded-3xl bg-pink-500 p-1 hover:bg-pink-700 active:bg-pink-700/50 transition-colors duration-300 focus:outline-none ${
                        isSending ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      onClick={handleSend}
                      disabled={isSending}
                    >
                      <FaArrowUp className="text-white font-semibold text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex justify-center items-center mb-10">
            <span className="text-2xl my-custom-font font-[10px] tracking-tighter text-fuchsia-600">
              Actionable Errors
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="box-border h-[250px] w-[600px] border-[4px] border-pink-300 hover:border-pink-500 transition-colors duration-300 rounded-[1.25rem] bg-white/25 hover:bg-white/50 flex mb-[25px]">
              <div className="overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${
                      message.direction === "incoming"
                        ? "justify-center"
                        : "hidden"
                    }`}
                  >
                    <div
                      className={`${
                        message.direction === "incoming"
                          ? "bg-pink-500 text-white"
                          : "text-blue"
                      } p-3 rounded-[1.25rem] max-w-lg shadow-lg`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-pink-500 text-white p-3 rounded-[1.25rem] max-w-xs shadow-lg">
                      ChatGPT is typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OR;
