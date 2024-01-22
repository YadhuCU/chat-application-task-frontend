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
  const currentMessageInViewRef = useRef(null);
  const dispatch = useDispatch();

  const { currentChatUser, showChat } = useSelector(
    (state) => state.chatUsersSlice,
  );

  useEffect(() => {
    Object.keys(currentChatUser).length != 0 &&
      currentMessageRef.current.focus();

    const author = localStorage.getItem("userName");
    setAuthor(author);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
      dispatch(addCurrentChatUser(data.author));
    });
  }, [socket]);
  useEffect(() => {
    if (currentMessageInViewRef.current) {
      currentMessageInViewRef.current.scrollIntoView({ smooth: true });
    }
  }, [currentChatUser?.messages]);

  const handleKeydown = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

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
    <div
      className={`${
        showChat || "hidden"
      } rounded-[10px]  md:block shadow-lg overflow-hidden bg-gradient-to-r from-pink-100 to-violet-100`}
    >
      {Object.keys(currentChatUser).length != 0 ? (
        <div className="flex flex-col relative">
          <Navbar messageArea user={currentChatUser.chatUser} />
          <div className="h-[80vh] md:h-[70vh] p-5 flex gap-1 flex-col overflow-y-scroll ">
            {/* message from them */}
            {currentChatUser?.messages?.length > 0
              ? currentChatUser.messages.map((item, index) => (
                  <div
                    ref={currentMessageInViewRef}
                    key={index}
                    className={`rounded-full ${
                      author == item.author
                        ? "self-end bg-green-400 rounded-br-[0px]"
                        : "bg-fuchsia-400 rounded-bl-[0px]"
                    }  w-[max-content] px-5 py-2 flex gap-2 items-end`}
                  >
                    <div className="text-slate-800">{item.message}</div>
                    <div className="text-slate-600 text-xs translate-y-1">
                      {item.time}
                    </div>
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
              onKeyDown={(e) => handleKeydown(e)}
              type="text"
              placeholder="Type message..."
              className="rounded-[100vw] w-full outline-none placeholder:text-slate-700 bg-purple-300 text-slate-700 px-5 py-2"
            />
            <div
              onClick={sendMessage}
              className="p-3 bg-purple-300 rounded-full"
            >
              <IoIosSend />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-h-[90vh] md:h-[70vh] p-5 flex item-center justify-center overflow-x-scroll ">
          <h3 className="text-slate-500">No message yet...</h3>
        </div>
      )}
    </div>
  );
};
