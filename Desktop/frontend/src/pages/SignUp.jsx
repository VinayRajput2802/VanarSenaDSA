import { useState, useRef } from "react";
import { useAnimations } from "../utils/Animation";
import { Link } from "react-router-dom";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const canvasRef = useRef(null);

  // animation hook (starfield)
  useAnimations(canvasRef);

  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Register");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

  const togglePass = () => {
    setShowPass(!showPass);
  };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            "http://localhost:8085/api/add",null,{
            params:{
                name:name,
                username:username,
                email:email,
                password:password,
                confirmPassword:confirmPassword
                }
            }
          );
        if (res.data=="success"){
          setMsg(res.data);
          navigate(`/otp?username=${email}`);
        }

        } catch (err) {
          console.log(err);
          setMsg("error ");

        }
    }

  return (
    <div>
      {/* Canvas */}
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
            {msg && <h3>{msg}</h3>}

          {/* Top */}
          <div className="card-top">
            <div className="card-avatar">
              <span>&#9670;</span>
            </div>
            <h1>Welcome To Code With Vanar Sena</h1>
            <p>Signup to continue your DSA journey</p>
          </div>

          {/* Form */}
          <form className="form" onSubmit={handleLogin}>
              <div className="field">

                  <label>Enter Full Name</label>


                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">

                  <label>UserName</label>


                <div className="input-wrap">
                  <input
                    type="text"
                    placeholder="Enter UserName"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

            {/* Email */}
            <div className="field">
              <label>Email address</label>

              <div className="input-wrap">
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
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
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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


            {/* Remember */}
            <div className="remember-row">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me for 30 days
              </label>
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

          {/* Signup */}
          <p className="signup-text">
            Do you have an account? <Link to="/Login">Login</Link>
          </p>


        </div>

      </main>
    </div>
  );
}

export default Signup;