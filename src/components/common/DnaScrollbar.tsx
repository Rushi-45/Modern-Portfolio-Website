"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const HELIX_WIDTH = 28;
const TURNS_PER_100PX = 0.85;
const SEGMENTS_PER_TURN = 24;
const RUNGS_PER_TURN = 8;

const STRAND_1_RAINBOW = ["#60a5fa", "#4fd1c5", "#a78bfa", "#f472b6", "#f59e0b"];
const STRAND_2_RAINBOW = ["#a78bfa", "#f472b6", "#f59e0b", "#34d399", "#4fd1c5"];

const DIM_STRAND_1 = "#0ea5e9";
const DIM_STRAND_2 = "#4fd1c5";
const DIM_OPACITY = 0.18;

const RUNG_COLOR = "#e0e7ff";
const RUNG_VISITED_OPACITY = 0.55;
const RUNG_REMAINING_OPACITY = 0.08;

type Segment = {
  key: string;
  strand: 1 | 2 | 0;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  z: number;
  strokeWidth: number;
  strokeOpacity: number;
};

function computeTurns(height: number) {
  return Math.max(2, Math.round((height * TURNS_PER_100PX) / 100));
}

function buildSegments(height: number, turns: number): Segment[] {
  const segCount = turns * SEGMENTS_PER_TURN;
  const segs: Segment[] = [];
  const amp = HELIX_WIDTH / 2;
  const cx = HELIX_WIDTH / 2 + 2;

  for (let i = 0; i < segCount; i++) {
    const t1 = i / segCount;
    const t2 = (i + 1) / segCount;
    const y1 = t1 * height;
    const y2 = t2 * height;
    const a1 = t1 * turns * Math.PI * 2;
    const a2 = t2 * turns * Math.PI * 2;

    const z1 = (Math.sin(a1) + Math.sin(a2)) / 2;
    segs.push({
      key: `s1-${i}`,
      strand: 1,
      x1: cx + amp * Math.cos(a1),
      y1,
      x2: cx + amp * Math.cos(a2),
      y2,
      z: z1,
      strokeWidth: 1.2 + 0.9 * ((z1 + 1) / 2),
      strokeOpacity: 0.4 + 0.6 * ((z1 + 1) / 2),
    });

    const z2 = -((Math.sin(a1) + Math.sin(a2)) / 2);
    segs.push({
      key: `s2-${i}`,
      strand: 2,
      x1: cx - amp * Math.cos(a1),
      y1,
      x2: cx - amp * Math.cos(a2),
      y2,
      z: z2,
      strokeWidth: 1.2 + 0.9 * ((z2 + 1) / 2),
      strokeOpacity: 0.4 + 0.6 * ((z2 + 1) / 2),
    });
  }

  const totalRungs = turns * RUNGS_PER_TURN;
  for (let i = 0; i < totalRungs; i++) {
    const t = (i + 0.5) / totalRungs;
    const y = t * height;
    const a = t * turns * Math.PI * 2;
    const x1 = cx + amp * Math.cos(a);
    const x2 = cx - amp * Math.cos(a);
    const spread = Math.abs(Math.cos(a));
    if (spread < 0.12) continue;

    segs.push({
      key: `r-${i}`,
      strand: 0,
      x1,
      y1: y,
      x2,
      y2: y,
      z: 0,
      strokeWidth: 1,
      strokeOpacity: 0.85 * spread,
    });
  }

  return segs.sort((a, b) => a.z - b.z);
}

const DnaScrollbar = () => {
  const [mounted, setMounted] = useState(false);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    setMounted(true);
    const onResize = () => setHeight(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 18,
    mass: 0.35,
  });

  const turns = useMemo(() => computeTurns(height), [height]);
  const segments = useMemo(() => buildSegments(height, turns), [height, turns]);

  const amp = HELIX_WIDTH / 2;
  const cx = HELIX_WIDTH / 2 + 2;

  const ballY = useTransform(smooth, [0, 1], [0, height]);
  const ballX = useTransform(
    smooth,
    (p) => cx + amp * Math.cos(p * turns * Math.PI * 2)
  );
  const ballZ = useTransform(smooth, (p) =>
    Math.sin(p * turns * Math.PI * 2)
  );

  const stop25 = useTransform(smooth, (p) => `${(p * 25).toFixed(2)}%`);
  const stop50 = useTransform(smooth, (p) => `${(p * 50).toFixed(2)}%`);
  const stop75 = useTransform(smooth, (p) => `${(p * 75).toFixed(2)}%`);
  const stop100 = useTransform(smooth, (p) => `${(p * 100).toFixed(2)}%`);

  const ballColor = useTransform(
    smooth,
    [0, 0.25, 0.5, 0.75, 1],
    STRAND_1_RAINBOW
  );
  const glowFilter = useMotionTemplate`drop-shadow(0 0 5px ${ballColor}) drop-shadow(0 0 12px ${ballColor})`;

  const ballFrontOpacity = useTransform(
    ballZ,
    [-0.05, 0.05],
    [0, 1],
    { clamp: true }
  );
  const ballBackOpacity = useTransform(
    ballZ,
    [-0.05, 0.05],
    [0.55, 0],
    { clamp: true }
  );
  const ballR = useTransform(ballZ, [-1, 1], [3, 5]);
  const ballRBack = useTransform(ballZ, [-1, 0], [3, 0], { clamp: true });

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed right-2 lg:right-4 top-0 z-50 pointer-events-none hidden md:block"
      style={{ height: `${height}px` }}
    >
      <svg
        width={HELIX_WIDTH + 6}
        height={height}
        viewBox={`0 0 ${HELIX_WIDTH + 6} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id="dna-strand-1"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={height}
          >
            <stop offset="0%" stopColor={STRAND_1_RAINBOW[0]} stopOpacity="1" />
            <motion.stop
              offset={stop25}
              stopColor={STRAND_1_RAINBOW[1]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop50}
              stopColor={STRAND_1_RAINBOW[2]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop75}
              stopColor={STRAND_1_RAINBOW[3]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop100}
              stopColor={STRAND_1_RAINBOW[4]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop100}
              stopColor={DIM_STRAND_1}
              stopOpacity={DIM_OPACITY}
            />
            <stop
              offset="100%"
              stopColor={DIM_STRAND_1}
              stopOpacity={DIM_OPACITY}
            />
          </linearGradient>

          <linearGradient
            id="dna-strand-2"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={height}
          >
            <stop offset="0%" stopColor={STRAND_2_RAINBOW[0]} stopOpacity="1" />
            <motion.stop
              offset={stop25}
              stopColor={STRAND_2_RAINBOW[1]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop50}
              stopColor={STRAND_2_RAINBOW[2]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop75}
              stopColor={STRAND_2_RAINBOW[3]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop100}
              stopColor={STRAND_2_RAINBOW[4]}
              stopOpacity="1"
            />
            <motion.stop
              offset={stop100}
              stopColor={DIM_STRAND_2}
              stopOpacity={DIM_OPACITY}
            />
            <stop
              offset="100%"
              stopColor={DIM_STRAND_2}
              stopOpacity={DIM_OPACITY}
            />
          </linearGradient>

          <linearGradient
            id="dna-rung"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={height}
          >
            <stop
              offset="0%"
              stopColor={RUNG_COLOR}
              stopOpacity={RUNG_VISITED_OPACITY}
            />
            <motion.stop
              offset={stop100}
              stopColor={RUNG_COLOR}
              stopOpacity={RUNG_VISITED_OPACITY}
            />
            <motion.stop
              offset={stop100}
              stopColor={RUNG_COLOR}
              stopOpacity={RUNG_REMAINING_OPACITY}
            />
            <stop
              offset="100%"
              stopColor={RUNG_COLOR}
              stopOpacity={RUNG_REMAINING_OPACITY}
            />
          </linearGradient>
        </defs>

        <motion.circle
          cx={ballX}
          cy={ballY}
          r={ballRBack}
          fill={ballColor}
          style={{
            opacity: ballBackOpacity,
            filter: "blur(1.2px)",
          }}
        />

        {segments.map((s) => (
          <line
            key={s.key}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={
              s.strand === 1
                ? "url(#dna-strand-1)"
                : s.strand === 2
                ? "url(#dna-strand-2)"
                : "url(#dna-rung)"
            }
            strokeWidth={s.strokeWidth}
            strokeOpacity={s.strokeOpacity}
            strokeLinecap="round"
          />
        ))}

        <motion.circle
          cx={ballX}
          cy={ballY}
          r={ballR}
          fill={ballColor}
          style={{
            opacity: ballFrontOpacity,
            filter: glowFilter,
          }}
        />
        <motion.circle
          cx={ballX}
          cy={ballY}
          r={2}
          fill="#ffffff"
          style={{ opacity: ballFrontOpacity }}
        />
      </svg>
    </div>
  );
};

export default DnaScrollbar;
