import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, MeshPhongMaterial } from "three";
import { OrbitControls, Stars } from "@react-three/drei";

function Globe() {
  const meshRef = useRef();
  const cloudsRef = useRef();

  useFrame(() => {
    // 持续旋转地球仪
    meshRef.current.rotation.y += 0.005;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.006; // Clouds rotate a bit faster for effect
    }
  });

  const earthTexture = new TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
  );
  const cloudsTexture = new TextureLoader().load(
    "https://threejs.org/examples/textures/planets/earth_clouds_2048.png",
  );

  const earthMaterial = new MeshPhongMaterial({
    map: earthTexture,
  });
  const cloudsMaterial = new MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.4,
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <primitive object={earthMaterial} />
      </mesh>
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <primitive object={cloudsMaterial} />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <OrbitControls />
      <Globe />
    </Canvas>
  );
}

export default Scene;
