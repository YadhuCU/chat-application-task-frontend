import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./page/Auth";
import { Home } from "./page/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Auth />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
