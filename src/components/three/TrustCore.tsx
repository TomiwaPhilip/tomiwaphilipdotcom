"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { trustCoreVert, trustCoreFrag } from "./shaders";
import { useScene } from "@/lib/store";

/**
 * TrustCore — a noise-displaced icosahedron at the center of the scene.
 * Driven by time, scroll phase, audio amplitude (if audio is enabled).
 */
export function TrustCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const scrollProgress = useScene((s) => s.scrollProgress);
  const audioOn = useScene((s) => s.audioOn);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 0.22 },
      uAudio: { value: 0 },
      uPhase: { value: 0 },
      uColorA: { value: new THREE.Color("#d4ff3a") },
      uColorB: { value: new THREE.Color("#5b2bff") },
      uColorRim: { value: new THREE.Color("#f4f4f2") },
    }),
    [],
  );

  // Pseudo audio: a slow sine that's silent unless audio is enabled
  const audioPulse = useRef(0);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uPhase.value = THREE.MathUtils.lerp(
      uniforms.uPhase.value,
      scrollProgress,
      0.08,
    );

    if (audioOn) {
      audioPulse.current += delta * 1.6;
      const a = 0.5 + 0.5 * Math.sin(audioPulse.current);
      uniforms.uAudio.value = THREE.MathUtils.lerp(uniforms.uAudio.value, a, 0.12);
    } else {
      uniforms.uAudio.value = THREE.MathUtils.lerp(uniforms.uAudio.value, 0, 0.08);
    }

    // Gentle base rotation + mouse follow
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.6,
        0.04,
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        mouse.x * 0.4,
        0.04,
      );

      // Scale pulse with audio + phase
      const targetScale = 1 + uniforms.uAudio.value * 0.06 + scrollProgress * 0.08;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08),
      );
    }

    // Counter-rotate the wireframe shell for crystalline web3 feel
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.18;
      wireRef.current.rotation.x += delta * 0.05;
      const wireScale = 1.42 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      wireRef.current.scale.setScalar(wireScale);
    }
  });

  return (
    <group>
      {/* Inner solid core with custom shader */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 24]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={trustCoreVert}
          fragmentShader={trustCoreFrag}
          uniforms={uniforms}
          transparent={false}
        />
      </mesh>

      {/* Crystalline wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#f4f4f2"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Outer faint sphere of light */}
      <mesh>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshBasicMaterial
          color="#5b2bff"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
