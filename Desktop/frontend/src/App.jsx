import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Otp from "./pages/Otp";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotOtp from "./pages/ForgotOtp";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/forgotOtp" element={<ForgotOtp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
