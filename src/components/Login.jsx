import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = () => {
    if (!userName) return;
    localStorage.setItem("userName", userName);
    setUserName("");
    navigate("/home");
  };
  return (
    <div className="max-w-[500px] grid gap-2 p-5 text-stone-800 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-[5px] shadow-lg shadow-slate-200">
      <input
        ref={inputRef}
        type="text"
        placeholder="Username..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="bg-transparent px-4 py-1 rounded-[5px] outline-none border-[2px] border-stone-200"
      />
      <div className="flex justify-center items-center">
        <button
          onClick={handleLogin}
          className="px-3 py-1 bg-cyan-300 hover:shadow-lg hover:shadow-cyan-700 rounded-[5px]"
        >
          Login
        </button>
      </div>
    </div>
  );
};
