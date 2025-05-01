


import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AnimatedHeading = ({ text }) => {
  return (
    <h1 className="text-7xl md:text-8xl font-serif text-red-800 bg-clip-text flex flex-wrap justify-center mb-10 text-shadow-glow drop-shadow-2xl">
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className="inline-block transition-transform duration-300 transform hover:scale-150 hover:text-white drop-shadow-xl"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

const LandingPage = () => {
  const canvasRef = useRef(null);
  const prevPos = useRef({ x: null, y: null });
  const mousePos = useRef({ x: null, y: null });
  const circlesRef = useRef([]);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Full screen setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = 'black';
    canvas.style.display = 'block';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 0; // Ensure canvas stays below text
    canvas.style.cursor = 'none';

    // Update mouse position on move
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Initialize prevPos on first move
      if (prevPos.current.x === null) {
        prevPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Draw loop using GSAP ticker
    const draw = () => {
      const { x: currX, y: currY } = mousePos.current;
      const { x: prevX, y: prevY } = prevPos.current;

      // Only draw when the mouse has moved
      if (currX !== null && (currX !== prevX || currY !== prevY)) {
        // Create a random "pulsating" effect with new dark colors
        const size = Math.random() * 20 + 20; // Size between 20px and 40px
        const distortionX = Math.random() * 60 - 30; // Random horizontal distortion
        const distortionY = Math.random() * 60 - 30; // Random vertical distortion
        const opacity = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8
        const pulseSpeed = Math.random() * 2 + 0.5; // Random pulse speed

        // Choose a color for the circle randomly from dark, blood red, or fiery colors
        const colors = [
          'rgba(255, 0, 0,',    // Blood red
          'rgba(139, 0, 0,',    // Dark red
          'rgba(255, 69, 0,',   // Dark orange
          'rgba(0, 0, 0,'       // Black
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Store the circle's position and attributes temporarily
        circlesRef.current.push({
          x: currX + distortionX,
          y: currY + distortionY,
          size,
          time: Date.now(),
          opacity,
          pulseSpeed,
          color: randomColor,  // Random color chosen for each circle
        });

        // Draw the circle (fluid, distorted, and pulsating)
        ctx.fillStyle = `${randomColor} ${opacity})`; // Apply the selected color with opacity
        ctx.beginPath();
        ctx.ellipse(currX + distortionX, currY + distortionY, size, size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Update previous position for next frame
        prevPos.current = { x: currX, y: currY };
      }

      // Fade circles after some time
      const currentTime = Date.now();
      circlesRef.current = circlesRef.current.filter(circle => {
        // If the circle is older than 200ms, remove it (this is the fade-away effect)
        return currentTime - circle.time < 200;
      });

      // Clear the canvas and redraw all the recent circles with pulsing effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circlesRef.current.forEach((circle) => {
        const pulse = Math.sin((currentTime - circle.time) / circle.pulseSpeed) * 30 + 20; // Pulsing effect with larger circles
        ctx.fillStyle = `${circle.color} ${circle.opacity})`;  // Apply the color and opacity dynamically
        ctx.beginPath();
        ctx.ellipse(circle.x, circle.y, pulse, pulse, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Start the GSAP ticker
    gsap.ticker.add(draw);

    // Event listeners for mouse move and window resize
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignUpLoginClick = () => {
    navigate('/auth'); // Navigate to SignUpLogin component
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-black via-darkred to-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />

      <div className="relative z-10 text-center px-8 md:px-16">
        <AnimatedHeading text="Find Your Dream Party" />

        <p className="text-3xl md:text-4xl mb-10 text-red-600 italic drop-shadow-xl font-semibold">
          Vibe with the best crowd.
        </p>

        <div className="flex space-x-8 justify-center mb-16">
          <button
            onClick={handleSignUpLoginClick}
            className="bg-gradient-to-r from-red-800 via-black to-darkred text-white font-bold py-4 px-12 rounded-full shadow-2xl transition-transform transform hover:scale-110 hover:shadow-2xl"
          >
            Sign Up / Login
          </button>
          <button className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-black font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-200 transform hover:scale-110">
            Discover Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
