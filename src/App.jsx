import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./page/Auth";
import { Home } from "./page/Home";

function App() {
  return (
    <div className="w-[100vw] h-screen flex justify-center items-center bg-gradient-to-r from-slate-100 to-stone-200">
      <Routes>
        <Route path={"/"} element={<Auth />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
