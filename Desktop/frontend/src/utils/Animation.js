import { useEffect } from "react";

export function useAnimations(canvasRef, typeRef) {
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let W, H, CX, CY;
    const NUM = 420;
    const SPEED = 3.2;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      CX = W / 2;
      CY = H / 2;
    }

    window.addEventListener("resize", resize);
    resize();

    function newStar() {
      return {
        x: Math.random() * W - CX,
        y: Math.random() * H - CY,
        z: Math.random() * W,
        pz: 0,
      };
    }

    function resetStar(s) {
      s.x = Math.random() * W - CX;
      s.y = Math.random() * H - CY;
      s.z = W;
      s.pz = W;
    }

    const stars = Array.from({ length: NUM }, () => newStar());
    stars.forEach((s) => (s.pz = s.z));

    function drawStars() {
      ctx.fillStyle = "rgba(6, 6, 26, 0.22)";
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= SPEED;

        if (s.z <= 0) {
          resetStar(s);
          continue;
        }

        const sx = (s.x / s.z) * W + CX;
        const sy = (s.y / s.z) * W + CY;
        const px = (s.x / s.pz) * W + CX;
        const py = (s.y / s.pz) * W + CY;

        if (sx < 0 || sx > W || sy < 0 || sy > H) {
          resetStar(s);
          continue;
        }

        const life = 1 - s.z / W;
        const size = Math.max(0.3, life * 3.2);
        const alpha = Math.min(1, life * 1.5);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(200,200,255,${alpha})`;
        ctx.lineWidth = size;
        ctx.stroke();
      }

      requestAnimationFrame(drawStars);
    }

    drawStars();

    // TYPEWRITER
    if (typeRef?.current) {
      const phrases = [
        "Think. Code. Conquer.",
        "One Problem a Day.",
        "From Zero to Hero.",
        "Crack Every Interview.",
      ];

      let pi = 0,
        ci = 0,
        deleting = false;

      function type() {
        const phrase = phrases[pi];

        typeRef.current.textContent = deleting
          ? phrase.substring(0, ci--)
          : phrase.substring(0, ci++);

        let delay = deleting ? 45 : 90;

        if (!deleting && ci > phrase.length) {
          delay = 1800;
          deleting = true;
        } else if (deleting && ci < 0) {
          deleting = false;
          ci = 0;
          pi = (pi + 1) % phrases.length;
          delay = 400;
        }

        setTimeout(type, delay);
      }

      type();
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
}