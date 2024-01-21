import { Sidebar } from "../components/Sidebar";
import { MessageArea } from "../components/MessageArea";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:3000");

export const Home = () => {
  const [receiver, setReceiver] = useState("");

  return (
    <div className="container overflow-hidden grid md:grid-cols-[1fr,2fr] md:container-lg p-1 md:p-5 gap-1">
      <Sidebar socket={socket} setReceiver={setReceiver} />
      <MessageArea socket={socket} />
    </div>
  );
};
