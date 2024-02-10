import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import OpenRouter from "./components/core/Auth/OpenRouter";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import MyProfile from "./components/core/Settings/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRouter";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-800 flex flex-col ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* openroute */}
        <Route
          path="login"
          element={
            <OpenRouter>
              <Login />
            </OpenRouter>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRouter>
              <Signup />
            </OpenRouter>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
