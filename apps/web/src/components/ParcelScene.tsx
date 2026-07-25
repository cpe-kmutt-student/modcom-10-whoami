'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import ParticlesBackground from "@/components/ParticlesBackground";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";

type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

// Suppress the benign THREE.Clock deprecation warning coming from @react-three/fiber internals
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
      return;
    }
    originalWarn(...args);
  };
}

function ParcelBoxAnimation({
  onReadyToOpen,
  triggerOpen,
}: {
  onReadyToOpen: () => void;
  triggerOpen: boolean;
}) {
  const boxGroup = useRef<THREE.Group>(null);
  const top1 = useRef<THREE.Mesh>(null);
  const top2 = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const left = useRef<THREE.Mesh>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { viewport } = useThree();

  const { nodes, materials } = useGLTF(
    "/model/CPEBOX.glb",
  ) as unknown as GLTFResult;

  useGSAP(() => {
    if (
      !boxGroup.current ||
      !top1.current ||
      !top2.current ||
      !right.current ||
      !left.current
    )
      return;

    const startY = viewport.height + 5;

    gsap.set(boxGroup.current.position, { y: startY });

    const tl = gsap.timeline({ delay: 0.5 });
    tlRef.current = tl;

    tl.to(boxGroup.current.position, {
      y: 0,
      duration: 1.5,
      ease: "bounce.out",
    });

    const shakeDuration = 0.12;
    const shakeAngle = 0.22;

    const addShake = (intensity = 1, repeats = 1) => {
      if (!boxGroup.current) return;
      for (let i = 0; i < repeats; i++) {
        const jumpY = 0.4 * intensity;

        tl.to(boxGroup.current.rotation, {
          z: -shakeAngle * intensity,
          duration: shakeDuration,
          ease: "sine.inOut",
        })
          .to(
            boxGroup.current.position,
            { y: jumpY, duration: shakeDuration, ease: "power1.out" },
            "<",
          )
          .to(boxGroup.current.rotation, {
            z: shakeAngle * intensity,
            duration: shakeDuration * 2,
            ease: "sine.inOut",
          })
          .to(boxGroup.current.rotation, {
            z: -shakeAngle * intensity,
            duration: shakeDuration * 2,
            ease: "sine.inOut",
          })
          .to(boxGroup.current.rotation, {
            z: 0,
            duration: shakeDuration,
            ease: "sine.inOut",
          })
          .to(
            boxGroup.current.position,
            { y: 0, duration: shakeDuration, ease: "power1.in" },
            "<",
          );
      }
    };

    tl.to({}, { duration: 0.4 });
    addShake(0.8, 1);
    tl.to({}, { duration: 0.6 });
    addShake(1.0, 1);
    tl.to({}, { duration: 0.5 });
    addShake(1.3, 1);

    tl.add(() => {
      onReadyToOpen();
    });

    tl.addPause();

    tl.to(
      boxGroup.current.position,
      { y: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" },
      "+=0.1",
    );

    const openAngle = Math.PI * 0.75;

    tl.to(
      top1.current.rotation,
      { x: openAngle, duration: 1.2, ease: "elastic.out(1, 0.4)" },
      "open+=0.1",
    )
      .to(
        top2.current.rotation,
        { x: -openAngle, duration: 1.2, ease: "elastic.out(1, 0.4)" },
        "open+=0.1",
      )
      .to(
        right.current.rotation,
        { z: -openAngle, duration: 1.2, ease: "elastic.out(1, 0.4)" },
        "open+=0.1",
      )
      .to(
        left.current.rotation,
        { z: openAngle, duration: 1.2, ease: "elastic.out(1, 0.4)" },
        "open+=0.1",
      );


    tl.to(
      boxGroup.current.position,
      { y: -20, duration: 1.2, ease: "power2.in" },
      "open+=1.5",
    ).to(
      boxGroup.current.scale,
      { x: 0, y: 0, z: 0, duration: 1.2, ease: "power2.in" },
      "<",
    );
  }, []);

  useEffect(() => {
    if (triggerOpen && tlRef.current) {
      tlRef.current.play();
    }
  }, [triggerOpen]);

  return (
    <group ref={boxGroup} dispose={null}>
      <mesh
        geometry={nodes.TopInner.geometry}
        material={materials["Material.002"]}
        position={[0, 0.97, 1]}
        ref={top1}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.TopInner001.geometry}
        material={materials["Material.002"]}
        position={[0, 0.97, -1]}
        ref={top2}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Box002.geometry}
        material={materials["Material.002"]}
        position={[1, 0.97, 0]}
        ref={right}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Box001.geometry}
        material={materials["Material.002"]}
        position={[0, -1, 0]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Box003.geometry}
        material={materials["Material.002"]}
        position={[-1, 0.97, 0]}
        ref={left}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/model/CPEBOX.glb');

interface ParcelSceneProps {
  hintId: string;
  hintImage: string;
  onAnimationComplete: () => void;
}

export default function ParcelScene({
  hintImage,
  onAnimationComplete,
  hintId,
}: ParcelSceneProps) {
  const t = useTranslations();

  const [isReadyToOpen, setIsReadyToOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);

  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  // eslint-disable-next-line react-hooks/refs
  const handleOpenClick = contextSafe(() => {
    const paper = paperRef.current;
    const canvasContainer = canvasContainerRef.current;
    const background = backgroundRef.current;

    if (!paper || !canvasContainer) return;

    setHasOpened(true);
    setIsReadyToOpen(false);

    const tl = gsap.timeline();

    tl.to({}, { duration: 0.8 });

    tl.fromTo(
      paper,
      {
        opacity: 0,
        scale: 0.1,
        rotationX: 60,
        y: 50,
      },
      {
        opacity: 1,
        scale: 0.4,
        y: -80,
        duration: 1,
        ease: "expo.out(1.2)",
        display: "flex",
      },
    );

    tl.to(
      canvasContainer,
      {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "+=0.5",
    );

    tl.to(
      paper,
      {
        rotationX: 0,
        rotationZ: 0,
        scale: 1,
        y: 0,
        width: "100vmin",
        maxWidth: "800px",
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          setIsAnimationDone(true);
          onAnimationComplete();
        },
      },
      "<",
    );

    tl.to(
      background,
      {
        opacity: 1,
        duration: 2.0,
        ease: "expo.in",
      },
      "+=0.3",
    );
  });

  return (
    <div className="w-full h-screen overflow-hidden relative selection:bg-quirky selection:text-blue-900 perspective-[1000px]">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full">
        <Canvas
          orthographic
          camera={{ position: [10, 10, 10], zoom: 60, near: -100, far: 100 }}
        >
          <ambientLight intensity={1.4} color="rgba(255, 237, 241, 1)" />
          <directionalLight
            position={[-3, 15, 10]}
            intensity={2}
            color="#ffffff"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.005}
            shadow-normalBias={0.1}
          />
          <ParcelBoxAnimation
            onReadyToOpen={() => setIsReadyToOpen(true)}
            triggerOpen={hasOpened}
          />
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
            color="#1e3a8a"
            resolution={512}
            depthWrite={false}
          />
        </Canvas>
      </div>

      <div
        className="absolute inset-2 flex items-center justify-center pointer-events-none z-30"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={paperRef}
          className="w-full hidden max-w-50 pointer-events-auto relative cursor-pointer"
          style={{
            aspectRatio: "683 / 412",
            transformStyle: "preserve-3d",
          }}
          onClick={() => {
            if (
              canvasContainerRef.current &&
              gsap.getProperty(canvasContainerRef.current, "opacity") === 0
            ) {
              if (isAnimationDone) {
                setIsFlipped(!isFlipped);
              }
            }
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className={`absolute inset-0 w-full h-full ${isFlipped ? "pointer-events-none" : ""}`}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              <div className={`w-full h-full ${isFlipped ? "" : "hover-3d"}`}>
                <div
                  className="w-full h-full bg-white p-4 md:p-6 border-2 border-blue-900 flex flex-col items-center justify-center relative rounded-md shadow-lg"
                  style={{
                    backgroundImage: `url("${hintImage}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center font-mali pointer-events-none select-none"></div>
                </div>

                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
                <div className="w-full h-full"></div>
              </div>
            </div>

            <div
              className="absolute inset-0 w-full h-full bg-blue-900 p-4 md:p-6 border-2 border-blue-900 flex flex-col items-center justify-center rounded-md shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-center font-sans">
                <div className="text-black px-3 md:px-8 py-1 md:py-3 bg-white text-xl md:text-4xl">
                  1045
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-24 pointer-events-none z-20">
        <div
          className={`transition-all duration-700 transform ${isReadyToOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0"}`}
        >
          <Button
            variant="quirky"
            size="lg"
            className="text-xl px-12 py-8 rounded-full shadow-comic font-mali"
            onClick={handleOpenClick}
          >
            <FontAwesomeIcon icon={faGift} className="mr-3 text-2xl" />
            {t("hint.open_box")}
          </Button>
        </div>
      </div>

      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0"
      >
        <ParticlesBackground />
      </div>
    </div>
  );
}
