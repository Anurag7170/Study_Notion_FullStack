import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen min-h-screen bg-richblack-800 flex flex-col ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
