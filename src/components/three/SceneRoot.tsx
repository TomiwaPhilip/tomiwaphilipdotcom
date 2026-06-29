"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { TrustCore } from "./TrustCore";
import { ParticleField } from "./ParticleField";
import { useScene } from "@/lib/store";

/**
 * Persistent WebGL canvas mounted in the root layout. Content renders above
 * with mix-blend / transparency. Bails out cleanly on reduced-motion or
 * low-power devices.
 */
export function SceneRoot() {
  const reducedMotion = useScene((s) => s.reducedMotion);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Low-power heuristic: very low cores or very low RAM → skip 3D
    type NavExt = Navigator & { deviceMemory?: number };
    const nav = navigator as NavExt;
    const cores = nav.hardwareConcurrency ?? 8;
    const mem = nav.deviceMemory ?? 8;
    if (cores < 4 || mem < 4) setEnabled(false);
  }, []);

  if (reducedMotion || !enabled) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 38%, rgba(212,255,58,0.10), transparent 60%), radial-gradient(800px 700px at 50% 75%, rgba(91,43,255,0.18), transparent 65%), #0a0a0b",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      data-scene-root
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0a0a0b"), 1);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 5]} intensity={0.6} color="#d4ff3a" />
          <pointLight position={[-3, -2, 4]} intensity={0.5} color="#5b2bff" />

          <TrustCore />
          <ParticleField count={1500} />

          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.6}
              mipmapBlur
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.0008, 0.0008)}
              blendFunction={BlendFunction.NORMAL}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
