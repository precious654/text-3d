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
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Infinity,
} from "lucide-react";
import gsap from "gsap";

export default function Text() {
  const textRef = React.useRef<THREE.Mesh>(null);
  const [rotate, setRotate] = React.useState(false);

  const moveUp = () => {
    if (!textRef.current) return;

    const text = textRef.current;
    gsap.to(text.position, {
      y: `+=0.1`,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  const moveDown = () => {
    if (!textRef.current) return;

    const text = textRef.current;
    gsap.to(text.position, {
      y: `+=-0.1`,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  const moveRight = () => {
    if (!textRef.current) return;

    const text = textRef.current;
    gsap.to(text.position, {
      x: `+=0.1`,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  const moveLeft = () => {
    if (!textRef.current) return;

    const text = textRef.current;
    gsap.to(text.position, {
      x: `+=-0.1`,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  React.useEffect(() => {
    if (!textRef.current) return;
    const text = textRef.current;

    const rotateText = () => {
      text.rotation.y += 0.02; // smooth continuous rotation
    };

    if (rotate) {
      gsap.ticker.add(rotateText);
    } else {
      gsap.ticker.remove(rotateText);
    }

    return () => {
      gsap.ticker.remove(rotateText);
    };
  }, [rotate]);

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#e0e0e0"]} />
        <OrbitControls />
        <Environment
          files={"/assets/HDRI/pathway_morning_4k.hdr"}
          environmentIntensity={0.7}
        />
        <directionalLight
          position={[0, 3, 3]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Plane />
        <Center>
          <Text3D
            font="/assets/fonts/Avalors Personal Use Only_Regular.json"
            position={[0, 0, 14]}
            castShadow
            receiveShadow
            ref={textRef}
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
      <div className="mt-5">
        <p className="text-2xl">Controls</p>
        <div className="flex justify-between items-center mt-9">
          <div className="flex flex-col gap-2 w-min items-center">
            <button
              className="border-2 p-2 rounded-full border-gray-300 hover:bg-gray-100 active:scale-95 transition"
              onClick={moveUp}
            >
              <ChevronUp className="" />
            </button>
            <div className="flex gap-6 items-center">
              <button
                className="border-2 p-2 rounded-full border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                onClick={moveLeft}
              >
                <ChevronLeft className="" />
              </button>
              <button
                className="border-2 p-2 rounded-full border-gray-300 hover:bg-gray-100 active:scale-95 transition"
                onClick={moveRight}
              >
                <ChevronRight className="" />
              </button>
            </div>
            <button
              className="border-2 p-2 rounded-full border-gray-300 hover:bg-gray-100 active:scale-95 transition"
              onClick={moveDown}
            >
              <ChevronDown className="" />
            </button>
          </div>
          <button
            className="border-2 p-2 rounded-full border-gray-300 hover:bg-gray-100 active:scale-95 transition"
            onClick={() => setRotate(!rotate)}
          >
            <Infinity size={30} className="" />
          </button>
        </div>
      </div>
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
    color: "#777",
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
