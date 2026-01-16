
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

type Props = { section?: "one" | "two" | "three" | "four" };

type SquareCoordinates = {
  lightX: number;
  lightY: number;
  darkX: number;
  darkY: number;
};

type SquareGen = {
  id: number;
  coordinates: SquareCoordinates[];
  side: number;
  borderRadius: number;
  position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
};

/* =========================================================
   DYNAMIC GENERATION
   ========================================================= */

const getDynamicSquares = (width: number, height: number): SquareGen[] => {
  const isMobile = width < 768;

  // Determine scale factor.
  // Mobile: Smaller scale (0.4 - 0.55) to prevent huge squares covering text.
  // Desktop: Standard scale (0.9 - 1.3).
  const scale = isMobile
    ? Math.min(Math.max(width / 768, 0.4), 0.55)
    : Math.min(Math.max(width / 1440, 0.9), 1.3);

  // Determine Border Radius
  // Mobile: Strictly reduced (e.g., 4px or 6px)
  // Desktop: Standard (12px)
  const borderRadius = isMobile ? 5 : 12;
  
  // Base anchor points as percentages of viewport
  // Mobile: Pushed further to corners (5% / 95%) to clear center area.
  const anchors = isMobile ? {
    tl: { x: width * 0.05, y: height * 0.15 }, 
    tr: { x: width * 0.95, y: height * 0.15 }, 
    bl: { x: width * 0.05, y: height * 0.85 }, 
    br: { x: width * 0.95, y: height * 0.85 }, 
  } : {
    tl: { x: width * 0.10, y: height * 0.20 }, // Top Left (Behind)
    tr: { x: width * 0.85, y: height * 0.25 }, // Top Right (Above)
    bl: { x: width * 0.10, y: height * 0.75 }, // Bottom Left (Above)
    br: { x: width * 0.85, y: height * 0.80 }, // Bottom Right (Behind)
  };

  // Helper to generate a cluster relative to an anchor point
  const makeCluster = (
    id: number,
    anchor: { x: number; y: number },
    position: SquareGen["position"],
    baseSide: number,
    offsets: { dx: number; dy: number }[]
  ): SquareGen => {
    const side = Math.round(baseSide * scale);
    const coordinates = offsets.map((o) => ({
      lightX: anchor.x + o.dx * scale,
      lightY: anchor.y + o.dy * scale,
      darkX: anchor.x + o.dx * scale + (id % 2 === 0 ? 0 : 0), 
      darkY: anchor.y + o.dy * scale + 20 * scale, // Shadow depth
    }));

    // Adjust shadow mapping
    const finalCoords = coordinates.map(c => ({
      lightX: c.lightX,
      lightY: c.lightY, 
      darkX: c.lightX,
      darkY: c.lightY + (20 * scale) 
    }));

    return {
      id,
      side,
      borderRadius,
      position,
      coordinates: finalCoords,
    };
  };

  if (isMobile) {
    // Symmetrical Mobile Configuration
    // Offsets are mirrored for Left vs Right clusters to ensure symmetry.
    // Values are reduced to keep squares closer to anchors and away from center text.
    return [
      // Top Left Cluster (ID 1)
      makeCluster(1, anchors.tl, "top-left", 80, [
        { dx: -60, dy: -10 },
        { dx: -10, dy: 30 },
        { dx: 30, dy: -20 },
        { dx: 10, dy: 50 },
      ]),
      // Top Right Cluster (ID 2) - Mirrored X of TL
      makeCluster(2, anchors.tr, "top-right", 80, [
        { dx: 60, dy: -10 },
        { dx: 10, dy: 30 },
        { dx: -30, dy: -20 },
        { dx: -10, dy: 50 },
      ]),
      // Bottom Left Cluster (ID 3)
      makeCluster(3, anchors.bl, "bottom-left", 80, [
        { dx: -50, dy: -20 },
        { dx: 20, dy: -40 },
        { dx: 40, dy: 10 },
        { dx: -10, dy: 40 },
      ]),
      // Bottom Right Cluster (ID 4) - Mirrored X of BL
      makeCluster(4, anchors.br, "bottom-right", 80, [
        { dx: 50, dy: -20 },
        { dx: -20, dy: -40 },
        { dx: -40, dy: 10 },
        { dx: 10, dy: 40 },
      ]),
    ];
  }

  // Desktop Configuration (Original/Larger)
  return [
    // Top Left Cluster (ID 1) -> BEHIND
    makeCluster(1, anchors.tl, "top-left", 85, [
      { dx: -120, dy: 0 },
      { dx: -30, dy: -30 },
      { dx: 70, dy: 10 },
      { dx: 160, dy: -20 },
    ]),
    // Top Right Cluster (ID 2) -> ABOVE
    makeCluster(2, anchors.tr, "top-right", 80, [
      { dx: -70, dy: -10 },
      { dx: 30, dy: -40 },
      { dx: 90, dy: 50 },
      { dx: 180, dy: 20 },
    ]),
    // Bottom Left Cluster (ID 3) -> ABOVE
    makeCluster(3, anchors.bl, "bottom-left", 82, [
      { dx: -60, dy: -40 },
      { dx: 25, dy: 15 },
      { dx: 100, dy: -15 },
      { dx: 170, dy: 30 },
    ]),
    // Bottom Right Cluster (ID 4) -> BEHIND
    makeCluster(4, anchors.br, "bottom-right", 75, [
      { dx: -150, dy: 10 },
      { dx: -70, dy: 50 },
      { dx: 30, dy: -10 },
      { dx: 100, dy: 40 },
    ]),
  ];
};

/* =========================================================
   ANIMATION CONFIG
   ========================================================= */

const CONFIG = {
  idleGroupAmpX: 12,
  idleGroupAmpY: 10,
  innerOscAmp: 15, 
  innerOscFreqMin: 0.1,
  innerOscFreqMax: 0.2, 
  idleLerp: 0.03, 
  PIXEL_STEP: 1, 
  mouseAmp: 40, 
};

/* =========================================================
   COMPONENT
   ========================================================= */

export const GreenSquares = (_props: Props) => {
  const [sections, setSections] = useState<SquareGen[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      setSections(getDynamicSquares(window.innerWidth, window.innerHeight));
    };

    update();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 100); 
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const pairs = useMemo(
    () =>
      sections.flatMap((s) =>
        s.coordinates.map((c, i) => ({
          key: `${s.id}-${i}`,
          clusterId: s.id, // Pass cluster ID for z-indexing
          ...c,
          size: s.side,
          borderRadius: s.borderRadius, // Pass styling down
        }))
      ),
    [sections]
  );

  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const darkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<{ x: number; y: number }[]>([]);

  const seeds = useMemo(
    () =>
      pairs.map(() => ({
        phase: Math.random() * Math.PI * 2,
        freq:
          CONFIG.innerOscFreqMin +
          Math.random() * (CONFIG.innerOscFreqMax - CONFIG.innerOscFreqMin),
      })),
    [pairs.length] 
  );

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const quantize = (v: number) =>
      Math.round(v / CONFIG.PIXEL_STEP) * CONFIG.PIXEL_STEP;

    const tick = (t: number) => {
      const time = t / 1000;

      const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const h = typeof window !== 'undefined' ? window.innerHeight : 1000;
      
      const mx = (mouseRef.current.x / w) - 0.5;
      const my = (mouseRef.current.y / h) - 0.5;

      pairs.forEach((p, i) => {
        const wrap = wrapperRefs.current[i];
        const light = lightRefs.current[i];
        const dark = darkRefs.current[i];
        const seed = seeds[i];

        if (!wrap || !light || !dark || !seed) return;

        offsets.current[i] ??= { x: 0, y: 0 };

        const ambientX = Math.sin(time * 0.5 + i) * CONFIG.idleGroupAmpX;
        const ambientY = Math.cos(time * 0.5 + i) * CONFIG.idleGroupAmpY;
        
        const mouseX = mx * CONFIG.mouseAmp;
        const mouseY = my * CONFIG.mouseAmp;

        const targetX = ambientX + mouseX;
        const targetY = ambientY + mouseY;

        offsets.current[i].x = lerp(offsets.current[i].x, targetX, CONFIG.idleLerp);
        offsets.current[i].y = lerp(offsets.current[i].y, targetY, CONFIG.idleLerp);

        const qWrapX = quantize(offsets.current[i].x);
        const qWrapY = quantize(offsets.current[i].y);
        wrap.style.transform = `translate3d(${qWrapX}px, ${qWrapY}px, 0)`;

        const inner = Math.sin(time * seed.freq + seed.phase) * CONFIG.innerOscAmp;
        const qInner = quantize(inner);

        light.style.transform = `translate3d(0, ${qInner}px, 0)`;
        dark.style.transform = `translate3d(0, 0, 0)`; 
      });

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [pairs, seeds]);

  return (
    <>
      {pairs.map((p, i) => {
        const dx = p.darkX - p.lightX;
        const dy = p.darkY - p.lightY;
        
        // Z-Index Logic:
        // Cluster 1 (TL) & 4 (BR) -> Behind (z: 1)
        // Cluster 2 (TR) & 3 (BL) -> Above (z: 20)
        // The card container is usually z: 10
        const zIndex = (p.clusterId === 2 || p.clusterId === 3) ? 20 : 1;

        return (
          <div
            key={p.key}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: p.lightX,
              top: p.lightY,
              width: p.size + Math.abs(dx),
              height: p.size + Math.abs(dy),
              pointerEvents: "none",
              zIndex: zIndex, 
            }}
          >
            <div
              ref={(el) => {
                darkRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: dx,
                top: dy,
                width: p.size,
                height: p.size,
                background: "#00885A",
                borderRadius: p.borderRadius, 
              }}
            />
            <div
              ref={(el) => {
                lightRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                background: "#00F866",
                borderRadius: p.borderRadius, 
              }}
            />
          </div>
        );
      })}
    </>
  );
};
