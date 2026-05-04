import { useState, useRef } from "react";
import { useAnimations } from "../utils/Animation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function ForgotPassword() {

    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword,setConfirmPassword] = useState("");
      const [msg, setMsg] = useState("");
      const navigate = useNavigate();

      const handleLogin = async (e) => {
          e.preventDefault();
        try {
          const res = await axios.post(
            "http://localhost:8085/api/forgot",{
                email:username,
                password:password,
                confirmPassword:confirmPassword
            }

          );

          setMsg(res.data);

            navigate("/forgotOtp",{
                state:{username:username,password:password}
                });


        } catch (err) {
          if (err.response){
              setMsg(err.response.data.message);
              }
          else if (err.request){
              setMsg("Server Not Respond");
              }
          else{
              setMsg("Something Went Wrong");
              }
        }
      }

  const canvasRef = useRef(null);

  // animation hook (starfield)
  useAnimations(canvasRef);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Submit");

  const togglePass = () => {
    setShowPass(!showPass);
  };


  return (
    <div>

      <canvas ref={canvasRef} id="starCanvas"></canvas>

      <header>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">&#9670;</span>
            Code with <span className="logo-accent">Vanar Sena</span>
          </Link>

          <Link to="/login" className="back-link">
            ← Back to Login Page
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="main">

        <div className="card">
            <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>


          {/* Top */}
          <div className="card-top">
            <div className="card-avatar">
              <span>&#9670;</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Change Your Password</p>
          </div>

          {/* Form */}
          <form className="form" onSubmit={handleLogin}>

            {/* Email */}
            <div className="field">
              <label>Email address</label>

              <div className="input-wrap">
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field">

               <label>Password</label>

              <div className="input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />


                <button
                  type="button"
                  className="eye-btn"
                  onClick={togglePass}
                >
                  👁
                </button>
              </div>
            </div>


            <div className="field">
                <label>Confirm Password</label>

              <div className="input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />


                <button
                  type="button"
                  className="eye-btn"
                  onClick={togglePass}
                >
                  👁
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {!loading ? btnText : "Loading..."}
            </button>

          </form>

        </div>

      </main>

    </div>

  );
}


export default ForgotPassword;