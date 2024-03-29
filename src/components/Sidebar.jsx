/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Users } from "./Users";
import { IoMdAdd } from "react-icons/io";

import { addUsers } from "../redux/chatUsersSlice";

export const Sidebar = ({ socket }) => {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState("");
  const dispatch = useDispatch();
  const newUserRef = useRef(null);

  const { users, showChat } = useSelector((state) => state.chatUsersSlice);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUser(userName);
    socket.emit("join_room", userName);
  }, []);

  const handleAdd = () => {
    setShow(false);
    dispatch(addUsers({ chatUser: newUser, messages: [] }));
    setNewUser("");
  };

  const handleCancel = () => {
    setShow(false);
    setNewUser("");
  };

  const handleAddButton = async () => {
    await setShow(true);
    newUserRef.current.focus();
  };

  return (
    <div
      className={` ${
        showChat && "hidden"
      } relative md:flex flex-col shadow-lg rounded-[10px] overflow-hidden bg-gradient-to-r from-pink-100 to-violet-100`}
    >
      <Navbar user={user} />
      {!show ? (
        <div className="h-[90vh] md:h-[70vh] overflow-y-scroll">
          {users.map((user, index) => (
            <Users key={index} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 p-5">
          {/* add new userChat */}
          <input
            ref={newUserRef}
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            type="text"
            placeholder="Username of user..."
            className="w-full rounded-[5px] bg-purple-300 px-5 py-2 outline-none placeholder:text-slate-700 text-slate-700"
          />
          <div className="flex gap-1 w-full">
            <button
              onClick={handleCancel}
              className="px-3 py-2 w-full rounded-[5px] text-slate-700 bg-red-300 hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-3 py-2 w-full rounded-[5px] text-slate-700 bg-green-300 hover:bg-green-500"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {/* add new userChat button */}
      <div
        onClick={handleAddButton}
        className="p-3 cursor-pointer bg-purple-300 rounded-full text-slate-700 absolute bottom-5 right-5"
      >
        <IoMdAdd />
      </div>
    </div>
  );
};
