/* eslint-disable react/prop-types */
import { IoIosSend } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, addCurrentChatUser } from "../redux/chatUsersSlice";

import { Navbar } from "./Navbar";

export const MessageArea = ({ socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [author, setAuthor] = useState("");
  const currentMessageRef = useRef(null);
  const dispatch = useDispatch();

  const { currentChatUser } = useSelector((state) => state.chatUsersSlice);

  useEffect(() => {
    currentMessageRef.current.focus();
    const author = localStorage.getItem("userName");
    setAuthor(author);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
      console.log(currentChatUser, "currentChatUser");
      dispatch(addCurrentChatUser(data.author));
    });
  }, [socket]);

  const sendMessage = async () => {
    currentMessageRef.current.focus();
    setCurrentMessage("");
    const newChat = {
      room: currentChatUser.chatUser,
      author: author,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    dispatch(addMessage(newChat));
    await socket.emit("send_message", newChat);
    dispatch(addCurrentChatUser(currentChatUser.chatUser));
  };

  return (
    <div className="rounded-[10px] hidden md:block shadow-lg overflow-hidden bg-gradient-to-r from-pink-100 to-violet-100">
      <div className="flex flex-col relative">
        <Navbar messageArea user={currentChatUser.chatUser} />
        <div className="max-h-[90vh] md:h-[70vh] p-5 flex flex-col overflow-x-scroll ">
          {/* message from them */}
          {currentChatUser?.messages?.length > 0
            ? currentChatUser.messages.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    author == item.author
                      ? "self-end bg-fuchsia-300"
                      : "bg-green-300"
                  } rounded border w-[max-content] px-3 py-2`}
                >
                  <div className="">{item.message}</div>
                </div>
              ))
            : null}

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
