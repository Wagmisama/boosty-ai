import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated gear component
function Gear({ position, scale = 1, rotationSpeed = 0.02 }: { position: [number, number, number], scale?: number, rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed;
    }
  });

  const gearGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 8);
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={gearGeometry} />
      <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// Floating data nodes
function DataNode({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

// Connection lines between nodes
function ConnectionLine({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#8b5cf6', opacity: 0.6, transparent: true }))} />
  );
}

// Chart bars representing analytics
function AnalyticsChart() {
  const heights = [0.5, 1.2, 0.8, 1.5, 1.0, 1.8, 1.3];
  
  return (
    <group position={[2, -1, 0]}>
      {heights.map((height, index) => (
        <Float key={index} speed={1 + index * 0.1} floatIntensity={0.2}>
          <mesh position={[index * 0.3 - 1, height / 2, 0]}>
            <boxGeometry args={[0.2, height, 0.2]} />
            <meshStandardMaterial 
              color={`hsl(${220 + index * 10}, 70%, 60%)`} 
              emissive={`hsl(${220 + index * 10}, 70%, 60%)`}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main 3D scene
function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
      
      {/* Central automation hub */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <MeshTransmissionMaterial
            color="#8b5cf6"
            thickness={0.5}
            transmission={0.9}
            roughness={0.1}
            ior={1.5}
          />
        </mesh>
      </Float>
      
      {/* Rotating gears */}
      <Gear position={[-2, 1, 0]} scale={0.6} rotationSpeed={0.03} />
      <Gear position={[1.5, 1.5, -0.5]} scale={0.4} rotationSpeed={-0.025} />
      <Gear position={[-1, -1.5, 0.5]} scale={0.5} rotationSpeed={0.02} />
      
      {/* Data nodes network */}
      <DataNode position={[-2.5, 0.5, 1]} />
      <DataNode position={[2.5, -0.5, -1]} />
      <DataNode position={[0, 2, 1.5]} />
      <DataNode position={[-1.5, -2, -0.5]} />
      <DataNode position={[2, 1, 0.5]} />
      
      {/* Connection lines */}
      <ConnectionLine start={[-2.5, 0.5, 1]} end={[0, 0, 0]} />
      <ConnectionLine start={[2.5, -0.5, -1]} end={[0, 0, 0]} />
      <ConnectionLine start={[0, 2, 1.5]} end={[0, 0, 0]} />
      <ConnectionLine start={[-1.5, -2, -0.5]} end={[0, 0, 0]} />
      <ConnectionLine start={[2, 1, 0.5]} end={[0, 0, 0]} />
      
      {/* Analytics chart */}
      <AnalyticsChart />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export function MarketingScene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}