import { Routes, Route, Link } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
