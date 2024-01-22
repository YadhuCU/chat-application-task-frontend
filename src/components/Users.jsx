/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addCurrentChatUser, toggleShowChat } from "../redux/chatUsersSlice";

export const Users = ({ user }) => {
  const dispatch = useDispatch();

  const handleCurrentChatUser = (user) => {
    dispatch(addCurrentChatUser(user.chatUser));
    dispatch(toggleShowChat());
  };
  return (
    <div
      onClick={() => handleCurrentChatUser(user)}
      className="flex gap-2 items-center cursor-pointer border-b-2 px-5 py-2 "
    >
      <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] font-bold bg-purple-200  rounded-full">
        {user?.chatUser[0].toUpperCase()}
      </div>
      <div className="flex flex-col w-full">
        <div className="text-lg text-slate-800">{user?.chatUser}</div>
        <div className="text-xs text-slate-700">
          {user?.messages?.length > 0
            ? user?.messages[user?.messages?.length - 1].message
            : null}
        </div>
      </div>
      <div className="self-end text-xs text-slate-600 border-2 ">
        {user?.messages?.length > 0
          ? user?.messages[user?.messages?.length - 1].time
          : null}
      </div>
    </div>
  );
};
