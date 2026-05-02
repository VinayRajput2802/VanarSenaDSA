import { useRef } from "react";
import { useAnimations } from "../utils/Animation";
import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  const canvasRef = useRef(null);
  const typeRef = useRef(null);

  useAnimations(canvasRef, typeRef);

  return (
    <div>

      {/* Canvas */}
      <canvas ref={canvasRef} id="starCanvas"></canvas>

      {/* Header */}
      <header>
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-icon">&#9670;</span>
            Code with <span className="logo-accent">Vanar Sena</span>
          </div>

          <nav className="nav-links">
            <Link to="#">Home</Link>
            <Link to="#">Topics</Link>
            <Link to="#">POTD</Link>
            <Link to="/login" className="nav-btn">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          ★ DSA Mastery Platform
        </div>

        <h1 className="hero-title">
          Master <span className="glow-blue">Data Structures</span><br />
          &amp; <span className="glow-gold">Algorithms</span>
        </h1>

        {/* Typewriter */}
        <h2 className="typewriter" ref={typeRef}></h2>

        <p className="hero-sub">
          Structured learning · Daily problems · AI-powered solutions
        </p>

        <div className="hero-actions">
          <Link to="#" className="btn-primary">Start Learning</Link>
          <Link to="#" className="btn-ghost">View Topics</Link>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Problems</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <span className="stat-num">30+</span>
            <span className="stat-label">Topics</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <span className="stat-num">Daily</span>
            <span className="stat-label">POTD</span>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="learning">
        <p className="section-tag">How it works</p>
        <h2 className="section-title">Our Learning Approach</h2>
        <p className="section-sub">
          Everything you need to crack DSA interviews and competitions.
        </p>

        <div className="cards">

          <div className="card">
            <div
              className="card-icon"
              style={{
                background: "rgba(99,102,241,0.15)",
                color: "#818cf8"
              }}
            >
              ◆
            </div>
            <h3>Basic → Advance</h3>
            <p>
              A fresh problem every day with intelligent AI-assisted breakdowns.
            </p>
            <Link to="#" className="card-link">Explore →</Link>
          </div>

          <div className="card card-featured">
            <div className="card-badge">Popular</div>

            <div
              className="card-icon"
              style={{
                background: "rgba(250,204,21,0.15)",
                color: "#fbbf24"
              }}
            >
              ★
            </div>

            <h3>Topic Wise Learning</h3>
            <p>
              Build strong fundamentals from arrays to graphs step by step.
            </p>
            <Link to="#" className="card-link">Explore →</Link>
          </div>

          <div className="card">
            <div
              className="card-icon"
              style={{
                background: "rgba(20,184,166,0.15)",
                color: "#2dd4bf"
              }}
            >
              ▶
            </div>
            <h3>Contests</h3>
            <p>
              Improve speed, accuracy, and real-world problem solving skills.
            </p>
            <Link to="#" className="card-link">Explore →</Link>
          </div>

        </div>
      </section>

      {/* Topics */}
      <section className="topics">
        <p className="section-tag">Curriculum</p>
        <h2 className="section-title">Topics Covered</h2>

        <div className="topic-pills">
          <span>Arrays</span><span>Sorting</span><span>Linked Lists</span>
          <span>Stacks & Queues</span><span>Binary Search</span>
          <span>Hash Map & Hashing</span><span>Dynamic Programming</span>
          <span>Greedy</span><span>Graphs</span>
          <span>Recursion & Backtracking</span>
          <span>Trees</span><span>Segment Tree</span>
          <span>Fenwick Tree & Binary Indexed Tree</span>
          <span>Disjoint Set & Union Find</span>
          <span>Divide & Conquer with DP</span>
          <span>Digit DP</span>
          <span>Bit Manipulation & Bitmasking</span>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="logo" style={{ marginBottom: "8px" }}>
            <span className="logo-icon">&#9670;</span>
            Code with <span className="logo-accent">Vanar Sena</span>
          </div>

          <p className="footer-sub">
            © 2026 Code with Vanar Sena | DSA Project
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;