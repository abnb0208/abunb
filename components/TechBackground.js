import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated particle system
const ParticleSystem = () => {
  const particlesRef = useRef();
  const count = 1000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  
  // Initialize particles
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    // Blue to purple gradient colors
    const mixFactor = Math.random();
    colors[i3] = 0; // R
    colors[i3 + 1] = mixFactor * 0.7; // G
    colors[i3 + 2] = 1; // B
    
    scales[i] = Math.random() * 0.2;
  }
  
  // Animate particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (particlesRef.current && particlesRef.current.geometry) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Create a flowing motion
        positions[i3 + 1] += Math.sin(time * 0.1 + i * 0.01) * 0.002;
        positions[i3] += Math.cos(time * 0.1 + i * 0.01) * 0.002;
        
        // Reset particles that go too far
        if (Math.abs(positions[i3]) > 5) positions[i3] *= -0.9;
        if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= -0.9;
        if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= -0.9;
      }
      
      // 安全检查：确保属性存在再进行操作
      if (particlesRef.current.geometry.attributes && 
          particlesRef.current.geometry.attributes.position) {
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      particlesRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'scale']}
          count={count}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Glowing grid
const Grid = () => {
  const gridRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gridRef.current && gridRef.current.material) {
      gridRef.current.material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
  });
  
  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial 
        color="#00f2fe" 
        wireframe={true} 
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Main 3D scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 10, 10]} intensity={0.5} color="#4facfe" />
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
      <ParticleSystem />
      <Grid />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
const TechBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
    </div>
  );
};

export default TechBackground; 