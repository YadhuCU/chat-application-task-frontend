/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addCurrentChatUser } from "../redux/chatUsersSlice";

export const Users = ({ user }) => {
  const dispatch = useDispatch();

  const handleCurrentChatUser = (user) => {
    dispatch(addCurrentChatUser(user.chatUser));
  };
  return (
    <div
      onClick={() => handleCurrentChatUser(user)}
      className="flex gap-2 items-center cursor-pointer border-b-2 px-5 py-2 text-slate-700"
    >
      <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] font-bold bg-purple-200  rounded-full">
        {user?.chatUser[0].toUpperCase()}
      </div>
      {user?.chatUser}
    </div>
  );
};
