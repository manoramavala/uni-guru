"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";


// Define types for the props that StarBackground will accept
interface StarBackgroundProps {
  // Add any custom props here, if needed
}

const StarBackground: React.FC<StarBackgroundProps> = (props) => {
  const ref = useRef<THREE.Group>(null); // Use THREE.Group as the type for the ref
  const [sphere] = useState<Float32Array>(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.9 })
  );

  // Using useFrame for animation logic
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 25;
      ref.current.rotation.z -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff" // Corrected color syntax from "$fff" to "#ffffff"
          size={0.0029}
          sizeAttenuation={true}
          depthWrite={false} // Fixed property name from "dethWrite" to "depthWrite"
        />
      </Points>
    </group>
  );
};

// StarsCanvas component
const StarsCanvas: React.FC = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0, // Set to -1 to be behind other content, or adjust if needed
      pointerEvents: "none", // Prevents interactions with the background
    }}
  >
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
