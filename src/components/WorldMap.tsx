import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import GraveModal from "./GraveModal";
import GraveDetail from "./GraveDetail";

interface WorldMapProps {
  className?: string;
}

interface Grave {
  id: string;
  x_coord: number;
  y_coord: number;
  message: string;
  tended_count: number;
  rating_avg: number;
  rating_count: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function WorldMap({ className = "" }: WorldMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPointerDown, setLastPointerDown] = useState(0);
  const [graves, setGraves] = useState<Grave[]>([]);
  
  // HUD/UI State
  const [modalState, setModalState] = useState({ isOpen: false, x: 0, y: 0 });
  const [selectedGrave, setSelectedGrave] = useState<Grave | null>(null);
  const [nearestHonored, setNearestHonored] = useState<Grave | null>(null);
  const [topGrave, setTopGrave] = useState<Grave | null>(null);
  
  // Cursor tracking for gravity effect
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Movement tracking for click/drag disambiguation
  const totalMove = useRef(0);
  const lastTapRef = useRef<number>(0);

  // Refs for animation loop access
  const gravesRef = useRef(graves);
  gravesRef.current = graves;
  
  const cameraRef = useRef({ ...camera, zoom });
  cameraRef.current = { ...camera, zoom };

  const particlesRef = useRef<Particle[]>([]);
  const trailParticlesRef = useRef<{x: number, y: number, vx: number, vy: number, life: number}[]>([]);
  const fogRef = useRef<{ x: number, y: number, size: number, speed: number, alpha: number }[]>([]);

  // Discover Nearest Honored and Global Top
  useEffect(() => {
    const discoverHonored = async () => {
      // 1. Get Global Top Grave for "The Trail"
      const { data: topData } = await supabase
        .from("graves")
        .select("*")
        .order("rating_avg", { ascending: false })
        .limit(1)
        .single();
      if (topData) setTopGrave(topData);

      // 2. Get Nearest 3.5+ Grave
      const { data: honoredData } = await supabase
        .from("graves")
        .select("*")
        .gte("rating_avg", 3.5)
        .limit(50);

      if (honoredData && containerRef.current) {
        let minDist = Infinity;
        let nearest: Grave | null = null;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        honoredData.forEach(g => {
          const dx = g.x_coord - camera.x;
          const dy = g.y_coord - camera.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          
          // Must be off-screen (account for zoom)
          const isOffScreen = Math.abs(dx) > (width/2)/zoom || Math.abs(dy) > (height/2)/zoom;
          
          if (isOffScreen && d < minDist) {
            minDist = d;
            nearest = g;
          }
        });
        setNearestHonored(nearest);
      }
    };

    discoverHonored();
    const interval = setInterval(discoverHonored, 5000);
    return () => clearInterval(interval);
  }, [camera.x, camera.y, zoom]);

  // Fetch Graves based on viewport
  useEffect(() => {
    const fetchGraves = async () => {
      // Scale fetch range inversely with zoom (wider range when zoomed out)
      const range = 2000 / Math.pow(zoom, 0.5); 
      const { data, error } = await supabase
        .from("graves")
        .select("*")
        .gte("x_coord", camera.x - range)
        .lte("x_coord", camera.x + range)
        .gte("y_coord", camera.y - range)
        .lte("y_coord", camera.y + range);

      if (!error && data) {
        setGraves(data as Grave[]);
      }
    };

    fetchGraves();
    const interval = setInterval(fetchGraves, 10000);
    return () => clearInterval(interval);
  }, [camera.x, camera.y, zoom]);

  // RequestAnimationFrame Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = cameraRef.current.x;
      const cy = cameraRef.current.y;
      const z = cameraRef.current.zoom;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Draw Static Background Gradients
      const bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      bgGrad.addColorStop(0, "#080808");
      bgGrad.addColorStop(1, "#020202");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(z, z);
      ctx.translate(-cx, -cy);

      // 2. Grid & Soul Orbs logic
      const gridSize = 140; 
      const startX = Math.floor((cx - (width / 2) / z) / gridSize) * gridSize;
      const endX = Math.ceil((cx + (width / 2) / z) / gridSize) * gridSize;
      const startY = Math.floor((cy - (height / 2) / z) / gridSize) * gridSize;
      const endY = Math.ceil((cy + (height / 2) / z) / gridSize) * gridSize;

      ctx.strokeStyle = "rgba(209, 209, 209, 0.08)";
      ctx.lineWidth = 1 / z; // Keep lines thin when zoomed in
      ctx.beginPath();
      for (let x = startX; x <= endX; x += gridSize) {
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
      }
      for (let y = startY; y <= endY; y += gridSize) {
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
      }
      ctx.stroke();

      const time = Date.now();
      gravesRef.current.forEach((grave) => {
        let x = grave.x_coord;
        let y = grave.y_coord;
        const avg = grave.rating_avg;

        // Interaction logic
        const worldMouseX = (mousePos.current.x - width / 2) / z + cx;
        const worldMouseY = (mousePos.current.y - height / 2) / z + cy;
        const dx = worldMouseX - x;
        const dy = worldMouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 250 / z) { 
          const pull = (1 - dist / (250 / z)) * (12 / z);
          x += (dx / dist) * pull;
          y += (dy / dist) * pull;
        }

        const baseRadius = 2.5 / Math.sqrt(z); // Stabilize size
        const pulse = Math.sin(time / 800 + (x * 0.02)) * 0.4 + 0.6; 
        const flicker = Math.random() > 0.97 ? Math.random() * 0.5 : 1; 
        
        const isGold = avg >= 4;
        const colorBase = isGold ? "255, 215, 0" : "74, 144, 226";
        
        let glowSize = (12 + (avg * 5)) * pulse * flicker;
        if (glowSize > 60) glowSize = 60;

        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * flicker})`;
        ctx.shadowBlur = (glowSize / 2) * z;
        ctx.shadowColor = `rgba(${colorBase}, 0.6)`;
        ctx.fill();

        const orbGrad = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        orbGrad.addColorStop(0, `rgba(${colorBase}, ${0.5 * pulse * flicker})`);
        orbGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = orbGrad;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Update and Draw Tending Particles
      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        if (p.life <= 0) {
          activeParticles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * (2.5 / z), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.life * 15 * z;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore(); // Back to screen space for trail and fog

      // 4. Ghostly Trail (The Trail)
      if (topGrave) {
        if (Math.random() > 0.94) {
          const dx = topGrave.x_coord - cx;
          const dy = topGrave.y_coord - cy;
          const angle = Math.atan2(dy, dx);
          
          trailParticlesRef.current.push({
            x: width / 2,
            y: height / 2,
            vx: Math.cos(angle) * 2 + (Math.random() - 0.5) * 1,
            vy: Math.sin(angle) * 2 + (Math.random() - 0.5) * 1,
            life: 1
          });
        }

        const activeTrail = trailParticlesRef.current;
        for (let i = activeTrail.length - 1; i >= 0; i--) {
          const tp = activeTrail[i];
          tp.x += tp.vx;
          tp.y += tp.vy;
          tp.life -= 0.005;

          if (tp.life <= 0) {
            activeTrail.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(209, 209, 209, ${tp.life * 0.15})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(209, 209, 209, 0.4)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 5. Draw Drifting Fog
      fogRef.current.forEach(f => {
        f.x += f.speed;
        if (f.x > width + f.size) f.x = -f.size;
        if (f.x < -f.size) f.x = width + f.size;
        const fogGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
        fogGrad.addColorStop(0, `rgba(100, 100, 100, ${f.alpha})`);
        fogGrad.addColorStop(1, "rgba(100, 100, 100, 0)");
        ctx.fillStyle = fogGrad;
        ctx.fillRect(f.x - f.size, f.y - f.size, f.size * 2, f.size * 2);
      });

      ctx.restore(); // End DPR scale

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [topGrave]); 

  // Handle Resize & DPI
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
        // Fog positioning
        fogRef.current.forEach(f => {
          f.y = Math.random() * rect.height;
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Native Zoom Handlers (Wheel & Pinch)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDist = 0;
    let initialZoom = 1;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.92 : 1.08;
      setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 3));
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        initialZoom = zoom;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        const delta = dist / initialDist;
        setZoom(Math.min(Math.max(initialZoom * delta, 0.1), 3));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [zoom]);

  // Spatial helper ...
  const findGraveAt = (worldX: number, worldY: number) => {
    const threshold = 25 / cameraRef.current.zoom; 
    return gravesRef.current.find(g => {
      const dx = g.x_coord - worldX;
      const dy = g.y_coord - worldY;
      return Math.sqrt(dx*dx + dy*dy) < threshold;
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (modalState.isOpen || selectedGrave) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    totalMove.current = 0;
    setLastPointerDown(Date.now());
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!isDragging || modalState.isOpen || selectedGrave) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    totalMove.current += Math.sqrt(dx * dx + dy * dy); 
    
    // Panning should be inversely proportional to zoom
    setCamera((prev) => ({ 
      x: prev.x - dx / zoom, 
      y: prev.y - dy / zoom 
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const now = Date.now();
    const timeSinceDown = now - lastPointerDown;
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (totalMove.current < 25 && timeSinceDown < 350) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const worldX = (e.clientX - rect.left - containerRef.current.clientWidth / 2) / zoom + camera.x;
      const worldY = (e.clientY - rect.top - containerRef.current.clientHeight / 2) / zoom + camera.y;

      // Handle Double Tap (Manual)
      if (timeSinceLastTap < 450) {
        setModalState({ isOpen: true, x: worldX, y: worldY });
        lastTapRef.current = 0; 
      } else {
        // Handle Single Tap (Read)
        const grave = findGraveAt(worldX, worldY);
        if (grave) setSelectedGrave(grave);
        lastTapRef.current = now;
      }
    }
    
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const worldX = (e.clientX - rect.left - containerRef.current.clientWidth / 2) + camera.x;
    const worldY = (e.clientY - rect.top - containerRef.current.clientHeight / 2) + camera.y;
    setModalState({ isOpen: true, x: worldX, y: worldY });
  };

  const createParticles = (x: number, y: number, color?: string) => {
    const colors = color ? [color] : ["#ffd700", "#ffffff", "#4a90e2"];
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push({
        x, y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  const handleRateGrave = async (id: string, newRating: number) => {
    const grave = gravesRef.current.find(g => g.id === id);
    if (!grave) return false;
    const newCount = grave.rating_count + 1;
    const newAvg = ((grave.rating_avg * grave.rating_count) + newRating) / newCount;

    const { data, error } = await supabase
      .from("graves")
      .update({ rating_avg: newAvg, rating_count: newCount })
      .eq("id", id)
      .select().single();

    if (!error && data) {
      setGraves(prev => prev.map(g => g.id === id ? (data as Grave) : g));
      if (selectedGrave?.id === id) setSelectedGrave(data as Grave);
      createParticles(data.x_coord, data.y_coord, newAvg >= 4 ? "#ffd700" : "#4a90e2");
      return true;
    }
    return false;
  };

  // Compass Angle Calculation
  const compassAngle = nearestHonored ? Math.atan2(nearestHonored.y_coord - camera.x, nearestHonored.x_coord - camera.y) : 0; // Fixed: wait, y-camera.y, x-camera.x
  const distToHonored = nearestHonored ? Math.sqrt(Math.pow(nearestHonored.x_coord - camera.x, 2) + Math.pow(nearestHonored.y_coord - camera.y, 2)) : 0;

  return (
    <div ref={containerRef} className={`relative w-full h-full bg-[#050505] overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className={`block w-full h-full touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
      
      {/* Heavy Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] opacity-80 mix-blend-multiply" />

      {/* Compass Needle Feature */}
      {nearestHonored && (
        <div className="absolute top-24 left-6 sm:top-10 sm:left-10 z-40 flex items-center gap-3 sm:gap-4 pointer-events-none select-none">
          <div 
            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${Math.atan2(nearestHonored.y_coord - camera.y, nearestHonored.x_coord - camera.x)}rad)` }}
          >
            <div className="w-px h-full bg-gradient-to-b from-[#ffd700] via-[#ffd700]/50 to-transparent" />
          </div>
          <div className="flex flex-col opacity-40">
            <span className="text-[7px] sm:text-[9px] font-mono text-[#ffd700] tracking-[0.3em] uppercase">Honored Nearby</span>
            <span className="text-[10px] sm:text-[14px] font-serif text-[#d1d1d1] italic tracking-widest lowercase">
              {Math.round(distToHonored)}m away
            </span>
          </div>
        </div>
      )}

      {/* HUD components */}
      <div className="absolute bottom-10 left-6 sm:left-8 pointer-events-none select-none mix-blend-plus-lighter z-30">
        <div className="flex flex-col gap-1 font-mono text-[8px] sm:text-xs text-[#d1d1d1]/30 tracking-[0.2em] uppercase">
          <span>X: {Math.round(camera.x).toString().padStart(5, ' ')}</span>
          <span>Y: {Math.round(camera.y * -1).toString().padStart(5, ' ')}</span>
        </div>
      </div>
      
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none select-none mix-blend-plus-lighter z-30 text-center opacity-70 w-full px-10">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 justify-center">
          <p className="font-sans text-[9px] sm:text-[11px] text-[#d1d1d1] tracking-widest uppercase sm:border-r sm:border-[#d1d1d1]/20 sm:pr-8">
            Double-click to bury
          </p>
          <p className="font-sans text-[9px] sm:text-[11px] text-[#d1d1d1] tracking-widest uppercase">
            Single-click to read
          </p>
        </div>
      </div>

      <GraveModal
        isOpen={modalState.isOpen}
        x={modalState.x}
        y={modalState.y}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onSubmit={async (msg) => {
          const { data, error } = await supabase
            .from("graves")
            .insert([{ x_coord: modalState.x, y_coord: modalState.y, message: msg, tended_count: 0, rating_avg: 0, rating_count: 0 }])
            .select().single();
          if (!error && data) setGraves(prev => [...prev, data as Grave]);
        }}
      />

      <GraveDetail 
        grave={selectedGrave} 
        onClose={() => setSelectedGrave(null)}
        onRate={handleRateGrave}
      />
    </div>
  );
}
