import { useEffect,useRef } from "react";
/* RESPONSIVE RAIN EFFECT */
const RainEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement; // Get the Hero section
    let animationFrameId;
    let drops = [];

    const init = () => {
      // 1. Size canvas to the PARENT element (Hero section), not the window
      // This prevents it from being too tall on mobile or too short if content stacks
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // 2. Responsive Drop Count
      // Reduce density on mobile so it doesn't look cluttered
      // ~1 drop per 20px of width
      const dropCount = Math.floor(canvas.width / 20); 
      
      drops = [];
      for (let i = 0; i < dropCount; i++) {
        drops.push(new Drop(canvas.width, canvas.height));
      }
    };

    class Drop {
      constructor(canvasW, canvasH) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.reset(true); // true = start randomly on screen
      }

      reset(initial = false) {
        this.x = Math.random() * this.canvasW;
        // If initial, scatter vertically. If resetting, start above top.
        this.y = initial ? Math.random() * this.canvasH : -Math.random() * 100;
        this.len = Math.random() * 15 + 10; // Slightly shorter drops for elegance
        this.speed = Math.random() * 2 + 0.5; // Slower, calmer rain
        // Randomize between Cyan and Purple
        this.color = Math.random() > 0.5 ? "rgba(6, 182, 212, " : "rgba(168, 85, 247, "; 
        this.opacity = Math.random() * 0.4 + 0.1; // Lower max opacity for subtlety
      }

      update() {
        this.y += this.speed;
        if (this.y > this.canvasH + this.len) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.len);
        gradient.addColorStop(0, `${this.color}0)`);
        gradient.addColorStop(1, `${this.color}${this.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2; // Thinner lines
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.len);
        ctx.stroke();
      }
    }

    // Initialize
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.forEach((drop) => {
        drop.update();
        drop.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resizing
    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      // No opacity here, handled in JS for better performance
    />
  );
};

export default RainEffect;