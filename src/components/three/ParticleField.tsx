"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Curl-noise particle cloud — ~1800 instanced points orbiting on procedural
 * paths around the Trust Core. Each particle is a small additive sprite.
 */
export function ParticleField({ count = 1800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spawn on a sphere shell with radius variance
      const r = 1.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.015 + Math.random() * 0.035;
      seeds[i] = Math.random() * 1000;
    }
    return { positions, sizes, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#d4ff3a") },
      uColorB: { value: new THREE.Color("#5b2bff") },
    }),
    [],
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  const vertex = /* glsl */ `
    attribute float aSize;
    attribute float aSeed;
    uniform float uTime;
    varying float vSeed;
    varying float vDepth;

    void main() {
      vSeed = aSeed;
      vec3 pos = position;

      // Orbit drift: rotate position around a per-particle axis
      float ang = uTime * 0.18 + aSeed * 0.5;
      mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
      pos.xz = rot * pos.xz;
      pos.y += sin(uTime * 0.7 + aSeed) * 0.06;

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      vDepth = -mvPos.z;
      gl_Position = projectionMatrix * mvPos;
      gl_PointSize = aSize * (300.0 / -mvPos.z);
    }
  `;

  const fragment = /* glsl */ `
    precision highp float;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vSeed;
    varying float vDepth;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, d);
      float mixT = fract(vSeed * 0.37);
      vec3 col = mix(uColorA, uColorB, mixT);
      gl_FragColor = vec4(col, alpha * 0.85);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
