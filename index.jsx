import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, Terminal } from 'lucide-react';

// --- DATA CONFIGURATION ---
const ORBS = [
  { id: 'game-design', title: 'GAME DESIGN', subtitle: 'Systems & Loops', color: '#ffb000' }, // Orange
  { id: 'ue-dev', title: 'UE DEV', subtitle: 'Blueprints & C++', color: '#ff3300' }, // Red
  { id: 'numerical', title: 'NUMERICAL', subtitle: 'Balance & Econ', color: '#00d4ff' }, // Cyan
  { id: 'ui-ux', title: 'UI / UX', subtitle: 'Figma to Frontend', color: '#b026ff' }, // Purple
];

// --- CANVAS AMBIENCE COMPONENT ---
const CanvasBackground = ({ themeColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      // Create a trailing effect
      ctx.fillStyle = 'rgba(8, 8, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Convert hex to rgb for rgba manipulation
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
      };
      
      const rgbColor = hexToRgb(themeColor);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, 0.5)`;
        ctx.fill();
      });

      // Draw tech grid
      ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000" />;
};

// --- ORBITAL HUB COMPONENT ---
const OrbitalHub = ({ onSelectOrb }) => {
  const [angleOffset, setAngleOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Responsive radii
  const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 350;
  const radiusY = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120; // Y is smaller to create the "slant"

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    const speed = 0.0005; // radians per millisecond

    const animate = (time) => {
      if (!isPaused) {
        const delta = time - lastTime;
        setAngleOffset((prev) => (prev + speed * delta) % (Math.PI * 2));
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Center Avatar / About Section */}
      <div className="absolute flex flex-col items-center z-10 pointer-events-none">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(255,176,0,0.2)]">
            <Terminal size={48} className="text-white/50" />
            {/* Replace with your actual avatar <img src="avatar.png" /> */}
        </div>
        
        {/* Desktop About (Hidden on Mobile, moved to layout shell) */}
        <div className="hidden md:block mt-6 text-center max-w-xs pointer-events-auto">
          <h2 className="text-xl font-bold tracking-widest text-white">JACK YEOH</h2>
          <p className="text-sm text-gray-400 mt-2">Bridging creative design and technical execution. Experienced in UE5 and Full-Stack pipelines.</p>
        </div>
      </div>

      {/* Orbiting Orbs */}
      {ORBS.map((orb, index) => {
        const angle = angleOffset + (index * (Math.PI * 2)) / ORBS.length;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        
        // Calculate z-index to create depth illusion (items in front vs back)
        const zIndex = Math.sin(angle) > 0 ? 20 : 0;
        const scale = 1 + (Math.sin(angle) * 0.15); // Items in front are slightly larger

        return (
          <motion.button
            key={orb.id}
            onClick={() => onSelectOrb(orb)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            whileHover={{ scale: scale * 1.1 }}
            className="absolute flex flex-col items-center justify-center text-left group"
            style={{
              x,
              y,
              zIndex,
              scale,
            }}
          >
            {/* The Node visually */}
            <div 
              className="w-4 h-4 rounded-full mb-2 transition-all duration-300 shadow-[0_0_15px_currentColor]"
              style={{ backgroundColor: orb.color, color: orb.color }}
            />
            {/* The Text Label */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
              <div className="font-bold tracking-widest text-sm text-white">{orb.title}</div>
              <div className="text-xs text-gray-400">{orb.subtitle}</div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

// --- BOOT SEQUENCE COMPONENT ---
const BootSequence = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer"
      onClick={onComplete} // Click anywhere to skip
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-64 max-w-full px-4">
        <motion.div 
          className="text-xs text-[#ffb000] tracking-widest mb-2 font-mono uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Initializing OS...
        </motion.div>
        
        {/* Loading Bar */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#ffb000]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 400); // Auto-advance after bar fills
            }}
          />
        </div>

        <motion.div 
          className="text-white font-bold tracking-widest mt-6 text-center text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          WELCOME, TO JACK YEOH'S PORTFOLIO
        </motion.div>
        
        <motion.div 
          className="text-gray-500 text-[10px] uppercase tracking-widest mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          [ Click anywhere to skip ]
        </motion.div>
      </div>
    </motion.div>
  );
};


// --- PROJECT DETAIL VIEW ---
const ProjectView = ({ project, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex flex-col pt-24 px-8 md:px-24 z-20"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-white/50 hover:text-white transition-colors mb-8 w-fit group"
      >
        <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="tracking-widest text-sm font-bold uppercase">Return to Hub</span>
      </button>

      <div className="max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4"
          style={{ color: project.color }}
        >
          {project.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 mb-8 max-w-xl"
        >
          Deep dive into the architecture, systems, and execution behind these projects.
        </motion.p>

        {/* Mock Content Blocks to show layout */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
            <h3 className="text-white font-bold tracking-widest mb-2">PROJECT 01</h3>
            <div className="w-full h-32 bg-black/50 mt-4 rounded flex items-center justify-center text-white/20">Video Asset Placeholder</div>
          </div>
          <div className="h-64 bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
            <h3 className="text-white font-bold tracking-widest mb-2">PROJECT 02</h3>
            <div className="w-full h-32 bg-black/50 mt-4 rounded flex items-center justify-center text-white/20">System Map Placeholder</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [appState, setAppState] = useState('boot'); // 'boot' | 'hub' | 'project'
  const [selectedOrb, setSelectedOrb] = useState(null);
  const [themeColor, setThemeColor] = useState('#ffb000'); // Default Orange

  // Simulate Session Storage Check
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (hasBooted) {
      setAppState('hub');
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('hasBooted', 'true');
    setAppState('hub');
  };

  const handleSelectOrb = (orb) => {
    setSelectedOrb(orb);
    setThemeColor(orb.color); // Change global theme color
    setAppState('project');
  };

  const handleBackToHub = () => {
    setAppState('hub');
    setThemeColor('#ffb000'); // Reset to default
    setTimeout(() => setSelectedOrb(null), 500); // Clear after exit animation
  };

  const replayIntro = () => {
    sessionStorage.removeItem('hasBooted');
    setAppState('boot');
    setThemeColor('#ffb000');
  };

  return (
    <div className="w-full h-screen bg-[#08080a] text-white font-sans overflow-hidden relative">
      {/* 1. Global Ambient Canvas Layer */}
      <CanvasBackground themeColor={themeColor} />

      {/* 2. Ultra-Wide Aspect Ratio Masking (Fades edges to black on massive screens) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#08080a] to-transparent z-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#08080a] to-transparent z-40" />

      {/* 3. Global Controls (Top Bar) */}
      {appState !== 'boot' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full p-6 md:px-12 z-40 flex justify-between items-start pointer-events-none"
        >
          <div className="pointer-events-auto">
            <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase" style={{ color: themeColor, textShadow: `0 0 20px ${themeColor}40` }}>
              Jack Yeoh
            </h1>
            <div className="text-xs tracking-widest text-gray-500 uppercase mt-1">
              SYS.VER.2.0 // Status: Nominal
            </div>
          </div>

          <button 
            onClick={replayIntro}
            className="pointer-events-auto flex items-center text-white/30 hover:text-white transition-colors group"
            title="Reboot System"
          >
            <span className="text-xs uppercase tracking-widest mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">Reboot</span>
            <RotateCcw size={18} />
          </button>
        </motion.div>
      )}

      {/* 4. Mobile About Section (Anchored to bottom only on small screens) */}
      {appState === 'hub' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-auto max-h-[30vh] overflow-y-auto"
        >
          <h2 className="text-lg font-bold tracking-widest text-white text-center">TECHNICAL DESIGNER</h2>
          <p className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
            Bridging creative design and technical execution. Scroll or select a node above to explore my workflow, systems design, and full-stack pipelines.
          </p>
        </motion.div>
      )}

      {/* 5. Main Content Area (Max Width Container) */}
      <div className="max-w-screen-2xl mx-auto h-full relative z-10">
        <AnimatePresence mode="wait">
          {appState === 'boot' && <BootSequence key="boot" onComplete={handleBootComplete} />}
          {appState === 'hub' && <OrbitalHub key="hub" onSelectOrb={handleSelectOrb} />}
          {appState === 'project' && selectedOrb && (
            <ProjectView key="project" project={selectedOrb} onBack={handleBackToHub} />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}