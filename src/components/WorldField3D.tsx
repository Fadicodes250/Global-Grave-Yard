"use client";

import { PointerLockControls, Stars, Html, Plane, useTexture } from "@react-three/drei";
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

// --- Volumetric Mist Floor ---
function GroundFog() {
  const texture = useTexture("/mist.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  
  const fogPlanes = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (fogPlanes.current) {
      fogPlanes.current.children.forEach((child, i) => {
        child.rotation.z = t * (0.02 + i * 0.01);
        (child as any).material.opacity = 0.15 + Math.sin(t * 0.5 + i) * 0.05;
      });
    }
  });

  return (
    <group ref={fogPlanes} position={[0, 0.1, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, i * 0.05, 0]}>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial 
            transparent 
            alphaMap={texture} 
            color="#111" 
            depthWrite={false}
            opacity={0.2}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- Player/Controls Component ---
function Player() {
  const { camera } = useThree();
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });
  
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
    const speed = 12; // Adjusted speed for better "walking" feel
    
    const moveZ = Number(moveState.current.forward) - Number(moveState.current.backward);
    const moveX = Number(moveState.current.right) - Number(moveState.current.left);
    
    if (moveX !== 0 || moveZ !== 0) {
      camera.translateX(moveX * speed * delta);
      camera.translateZ(-moveZ * speed * delta);
    }
    
    camera.position.y = 1.7; 
  });

  return <PointerLockControls />;
}

// --- Signboard Component ---
function GraveSign({ grave, onRead }: { grave: Grave; onRead: (g: Grave) => void }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={[grave.x_coord * 15, 0, grave.y_coord * 15]}>
      {/* Post */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 1.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      
      {/* Plaque */}
      <mesh 
        position={[0, 1.3, 0.05]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onRead(grave);
        }}
      >
        <boxGeometry args={[0.6, 0.35, 0.02]} />
        <meshStandardMaterial color={hovered ? "#222" : "#050505"} roughness={0.8} />
        
        {hovered && (
          <Html position={[0, 0.5, 0]} center>
            <div className="bg-black/90 backdrop-blur-xl border border-white/5 px-4 py-2 rounded-full text-white/50 font-mono text-[8px] tracking-[0.3em] uppercase animate-pulse whitespace-nowrap shadow-2xl">
               Decrypt Memory ({grave.rating_avg.toFixed(1)}★)
            </div>
          </Html>
        )}
      </mesh>

      {/* Soul Glow */}
      <pointLight 
        position={[0, 1.4, 0.1]} 
        distance={6} 
        intensity={grave.rating_avg >= 4 ? 3 : 1} 
        color={grave.rating_avg >= 4 ? "#ffd700" : "#d1d1d1"} 
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
  const groundTexture = useTexture("/mist.png");
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(50, 50);

  useEffect(() => {
    const fetchGraves = async () => {
      const { data } = await supabase.from("graves").select("*");
      if (data) setGraves(data as Grave[]);
    };
    fetchGraves();
    const interval = setInterval(fetchGraves, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: any) => {
    if (isPlacingGrave) return;
    const now = Date.now();
    if (now - lastClick.current < 400) {
      const { x, z } = e.point;
      onBury(x / 15, z / 15);
    }
    lastClick.current = now;
  };

  return (
    <div className="w-full h-full cursor-crosshair">
      <Canvas 
        shadows 
        camera={{ position: [0, 1.7, 15], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#010101"]} />
        <fogExp2 attach="fog" args={["#010101", 0.06]} />
        
        <ambientLight intensity={0.05} />
        <Stars radius={150} depth={50} count={2000} factor={4} saturation={0} fade speed={0.3} />

        <Player />

        {/* The Endless Void (Ground with subtle mist texture) */}
        <Plane 
          args={[5000, 5000]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          onClick={handleClick}
        >
          <meshStandardMaterial 
            color="#050505" 
            map={groundTexture} 
            opacity={0.8}
            transparent
            roughness={1} 
          />
        </Plane>
        
        <GroundFog />

        {/* Render Burial Stones */}
        {graves.map(g => (
          <GraveSign key={g.id} grave={g} onRead={onRead} />
        ))}
        
        {/* Instructions */}
        <Html position={[0, -2, 0]} center>
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-10 text-white font-mono text-[8px] tracking-[0.5em] uppercase text-center space-y-2">
              <p>WASD to wander • Double Click ground to bury</p>
           </div>
        </Html>
      </Canvas>
    </div>
  );
}
