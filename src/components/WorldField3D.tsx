"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls, Stars, Html, Plane } from "@react-three/drei";
import * as THREE from "three";
import { supabase } from "@/lib/supabaseClient";

// --- Types ---
interface Grave {
  id: string;
  x_coord: number;
  y_coord: number;
  message: string;
  rating_avg: number;
}

// --- Player/Controls Component ---
function Player() {
  const { camera } = useThree();
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": moveState.current.forward = true; break;
        case "KeyS": moveState.current.backward = true; break;
        case "KeyA": moveState.current.left = true; break;
        case "KeyD": moveState.current.right = true; break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": moveState.current.forward = false; break;
        case "KeyS": moveState.current.backward = false; break;
        case "KeyA": moveState.current.left = false; break;
        case "KeyD": moveState.current.right = false; break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const speed = 15; // Movement speed
    velocity.current.set(0, 0, 0);
    
    // Calculate direction relative to camera rotation
    const moveZ = Number(moveState.current.forward) - Number(moveState.current.backward);
    const moveX = Number(moveState.current.right) - Number(moveState.current.left);
    
    direction.current.set(moveX, 0, -moveZ).normalize();

    if (moveState.current.forward || moveState.current.backward || moveState.current.left || moveState.current.right) {
      camera.translateX(moveX * speed * delta);
      camera.translateZ(-moveZ * speed * delta);
    }
    
    camera.position.y = 1.7; // Constant head height
  });

  return <PointerLockControls />;
}

// --- Signboard Component ---
function GraveSign({ grave, onRead }: { grave: Grave; onRead: (g: Grave) => void }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={[grave.x_coord * 10, 0, grave.y_coord * 10]}>
      {/* Post */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Plaque */}
      <mesh 
        position={[0, 1.5, 0.06]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onRead(grave);
        }}
      >
        <boxGeometry args={[0.7, 0.4, 0.03]} />
        <meshStandardMaterial color={hovered ? "#333" : "#0f0f0f"} roughness={0.5} />
        
        {/* Interaction Hint */}
        {hovered && (
          <Html position={[0, 0.6, 0]} center>
            <div className="bg-black/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white/80 font-mono text-[9px] tracking-[0.2em] uppercase animate-pulse whitespace-nowrap shadow-2xl">
               Read Memory ({grave.rating_avg.toFixed(1)}★)
            </div>
          </Html>
        )}
      </mesh>

      {/* Eternal Light Glow */}
      <pointLight 
        position={[0, 1.6, 0.1]} 
        distance={8} 
        intensity={grave.rating_avg >= 4 ? 4 : 1.5} 
        color={grave.rating_avg >= 4 ? "#ffd700" : "#4a90e2"} 
      />
    </group>
  );
}

// --- Main 3D Field Wrapper ---
export default function WorldField3D({ 
  onBury, 
  onRead,
  isPlacingGrave
}: { 
  onBury: (x: number, z: number) => void;
  onRead: (g: Grave) => void;
  isPlacingGrave: boolean;
}) {
  const [graves, setGraves] = useState<Grave[]>([]);
  const lastClick = useRef(0);

  useEffect(() => {
    const fetchGraves = async () => {
      const { data } = await supabase.from("graves").select("*");
      if (data) setGraves(data as Grave[]);
    };
    fetchGraves();
    const interval = setInterval(fetchGraves, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: any) => {
    if (isPlacingGrave) return;
    const now = Date.now();
    if (now - lastClick.current < 400) {
      // Double click detected on ground
      const { x, z } = e.point;
      // Convert 3D back to 2D scaled coordinates
      onBury(x / 10, z / 10);
    }
    lastClick.current = now;
  };

  return (
    <div className="w-full h-full cursor-crosshair">
      <Canvas 
        shadows 
        camera={{ position: [0, 1.7, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#030303"]} />
        <fogExp2 attach="fog" args={["#030303", 0.05]} />
        
        <ambientLight intensity={0.1} />
        <Stars radius={150} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

        <Player />

        {/* The Endless Void (Ground) */}
        <Plane 
          args={[5000, 5000]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          onClick={handleClick}
        >
          <meshStandardMaterial color="#050505" roughness={1} />
        </Plane>
        
        <gridHelper args={[5000, 200, "#111", "#080808"]} position={[0, 0.01, 0]} />

        {/* Render Burial Stones */}
        {graves.map(g => (
          <GraveSign key={g.id} grave={g} onRead={onRead} />
        ))}
        
        {/* Instructions Overlay */}
        <Html position={[0, -10, 0]} center>
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-20 text-white font-mono text-[9px] tracking-[0.5em] uppercase text-center space-y-2">
              <p>WASD to wander • Double Click to bury</p>
              <p>Click to lock view • ESC to unlock</p>
           </div>
        </Html>
      </Canvas>
    </div>
  );
}
