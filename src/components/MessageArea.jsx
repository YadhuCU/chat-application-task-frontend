/* eslint-disable react/prop-types */
import { IoIosSend } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

import { Navbar } from "./Navbar";

export const MessageArea = ({ socket, receiver }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const currentMessageRef = useRef(null);

  useEffect(() => {
    currentMessageRef.current.focus();
    socket.on("receive_message", (data) => {
      console.log("Received Message: ", data);
    });
  }, [socket]);

  const sendMessage = () => {
    currentMessageRef.current.focus();
    setCurrentMessage("");
    const author = localStorage.getItem("userName");
    const newChat = {
      room: receiver,
      author: author,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    socket.emit("send_message", newChat);
  };

  return (
    <div className="rounded-[10px] hidden md:block shadow-lg overflow-hidden bg-gradient-to-r from-pink-100 to-violet-100">
      <div className="flex flex-col relative">
        <Navbar messageArea />
        <div className="max-h-[90vh] md:max-h-[70vh] p-5 flex flex-col overflow-x-scroll ">
          {/* message from them */}
          <div className="rounded border bg-green-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          {/* message from me */}
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>
          <div className="rounded self-end border bg-fuchsia-300 w-[max-content] px-3 py-2">
            <div className="">Hey wassup</div>
          </div>

          {/* send message input */}
        </div>
        <div className="p-5 flex gap-2 items-center relative bottom-0">
          <input
            ref={currentMessageRef}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            type="text"
            placeholder="Type message..."
            className="rounded-[100vw] w-full outline-none placeholder:text-slate-700 bg-purple-300 text-slate-700 px-5 py-2"
          />
          <div onClick={sendMessage} className="p-3 bg-purple-300 rounded-full">
            <IoIosSend />
          </div>
        </div>
      </div>
    </div>
  );
};
