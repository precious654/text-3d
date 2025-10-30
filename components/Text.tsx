"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Environment,
  Center,
  useTexture,
} from "@react-three/drei";

export default function Text() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <OrbitControls />
        <Environment
          files={"/assets/HDRI/pathway_morning_4k.hdr"}
          environmentIntensity={0.5}
        />
        <directionalLight position={[0, 3, 3]} intensity={1} />
        <Plane />
        <Center>
          <Text3D
            font="/assets/fonts/Avalors Personal Use Only_Regular.json"
            position={[0, 0, 14]}
            castShadow
          >
            Hello, 3D!
            <meshStandardMaterial
              color="#7E9022"
              metalness={0.8}
              roughness={0.3}
            />
          </Text3D>
        </Center>
      </Canvas>
    </div>
  );
}

const Plane = () => {
  const badlandDiffuse = useTexture(
    "/assets/textures/badlands-boulders-bl/badlands-boulders_albedo.png"
  );
  const badlandNormal = useTexture(
    "/assets/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png"
  );
  const badlandRoughness = useTexture(
    "/assets/textures/badlands-boulders-bl/badlands-boulders_roughness.png"
  );
  const badlandAO = useTexture(
    "/assets/textures/badlands-boulders-bl/badlands-boulders_ao.png"
  );

  const badlandMaterial = new THREE.MeshStandardMaterial({
    map: badlandDiffuse,
    normalMap: badlandNormal,
    roughnessMap: badlandRoughness,
    aoMap: badlandAO,
    roughness: 1,
    side: THREE.DoubleSide,
  });

  return (
    <mesh
      material={badlandMaterial}
      rotation-x={-Math.PI / 2}
      position-y={-0.5}
      receiveShadow
    >
      <planeGeometry args={[15, 15]} />
    </mesh>
  );
};
