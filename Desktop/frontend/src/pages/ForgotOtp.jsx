import { useState, useRef, useEffect } from "react";
import { useAnimations } from "../utils/Animation";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./otp.css";


function ForgotOtp() {
//     const query = new URLSearchParams(useLocation().search);
//     const username = query.get("username");
//     const password = query.get("password");
    const location = useLocation();
    const {username,password} = location.state || {};
    const[msg,setMsg] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const [time, setTime] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  const canvasRef = useRef(null);

  // animation
  useAnimations(canvasRef);


  // ⏱ Timer
  useEffect(() => {
    if (time === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // ✍️ Handle input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ⌫ Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 📋 Paste OTP
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = val;
      }
    });
  };

  // ✅ Verify OTP
  const handleVerify = async (e) =>  {
    const finalOtp = otp.join("");
    try{
        const res = await axios.post("http://localhost:8085/api/forgot/change",{

                email:username,
                otp:finalOtp,
                password:password

            }
            );
        if (res.data==true){
            navigate(`/`);
            }
        else{
            navigate(`/login`);
            }
        }
    catch(err){
        console.log("Error");
        }
  };

  // 🔄 Resend OTP
  const handleResend = async(e) => {
//     setOtp(new Array(6).fill(""));
//     inputsRef.current[0].focus();
    try{
        const res = await axios.post("http://localhost:8085/api/resend",null,{
            params:{
                email:username
                }
            });

        if (res.data==true){
            setMsg("Otp Send Successfull");
            }
        else{
            setMsg("Sorry Issue with server");
            }


        setTime(30);
        setCanResend(false);
    }
    catch(error){
            console.log("Server Error");
            }
  };

  return (
    <div>
      {/* Canvas Background */}
      <canvas ref={canvasRef} id="starCanvas"></canvas>

      {/* Header */}
      <header>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">&#9670;</span>
            Code with <span className="logo-accent">Vanar Sena</span>
          </Link>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <div className="card">

          {/* Top */}
          <div className="card-top">
            <div className="card-avatar">
              <span>&#9670;</span>
            </div>
            <h1>OTP Verification</h1>
            <p>
              Enter the OTP sent to{" "}
              <span style={{ color: "#a5b4fc" }}>
                {username || "your account"}
              </span>
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="otp-container" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.includes("")}
            className="btn-submit"
            style={{ marginTop: "20px" }}
          >
            Verify OTP
          </button>

          {/* Timer / Resend */}
          <div className="otp-timer">
            {!canResend ? (
              <p>Resend OTP in {time}s</p>
            ) : (
              <button onClick={handleResend} className="resend-btn">
                Resend OTP
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default ForgotOtp;