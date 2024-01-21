/* eslint-disable react/prop-types */
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

export const Navbar = ({ user, messageArea }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex  justify-between bg-gradient-to-r from-purple-300 to-violet-200 items-center p-5 text-slate-700">
      <div className="flex gap-2 items-center">
        <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] font-bold bg-purple-200  rounded-full">
          {user ? user[0].toUpperCase() : "$"}
        </div>
        {user || "No User"}
      </div>
      {messageArea || (
        <div
          onClick={() => setShow((prev) => !prev)}
          className="hover:bg-purple-200 relative transition-colors rounded-full p-3"
        >
          <BsThreeDotsVertical />
          {show && (
            <div className="px-5 py-2 cursor-pointer rounded-[5px] absolute right-0 bg-purple-200">
              logout
            </div>
          )}
        </div>
      )}
    </div>
  );
};
