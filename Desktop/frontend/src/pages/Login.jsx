import { useState, useRef } from "react";
import { useAnimations } from "../utils/Animation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {

    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [msg, setMsg] = useState("");
      const navigate = useNavigate();

      const handleLogin = async (e) => {
          e.preventDefault();
        try {
          const res = await axios.post(
            "http://localhost:8085/api/login",{
                email:username,
                password:password
            }

          );


          if (res.data=="success"){
              navigate("/dashboard");
              }
          else if (res.data=="password not match"){
              setMsg("Password Mismatch")
              }
          else{
              setMsg("User Not Found")
              }
        } catch (err) {
          setMsg("Server Error ❌");
        }
      };

  const canvasRef = useRef(null);

  // animation hook (starfield)
  useAnimations(canvasRef);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Login");

  const togglePass = () => {
    setShowPass(!showPass);
  };


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


          {/* Top */}
          <p style={{ color: msg.includes("success") ? "green" : "red" }}>{msg}</p>

          <div className="card-top">
            <div className="card-avatar">
              <span>&#9670;</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Login to continue your DSA journey</p>

          </div>

          {/* Social */}
          <div className="social-btns">
            <button className="social-btn">
                <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13 17.8 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
                    <path fill="#FBBC05" d="M10.6 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.9-6.1z"/>
                    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/>
                  </svg>
              Continue with Google
            </button>

            <button className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
              Continue with GitHub
            </button>
          </div>

          <div className="divider">
            <span>or login with email</span>
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
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot" className="forgot">
                  Forgot password?
                </Link>
              </div>

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
            Don't have an account? <Link to="/SignUp">Sign up free</Link>
          </p>

        </div>

      </main>

    </div>

  );
}


export default Login;