import { Sidebar } from "../components/Sidebar";
import { MessageArea } from "../components/MessageArea";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_ADDRESS);

export const Home = () => {
  return (
    <div className="container overflow-hidden grid md:grid-cols-[1fr,2fr] md:container-lg p-1 md:p-5 gap-1">
      <Sidebar socket={socket} />
      <MessageArea socket={socket} />
    </div>
  );
};
