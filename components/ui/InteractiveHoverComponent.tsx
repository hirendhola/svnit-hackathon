/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const InteractiveHoverComponent = ({
  text,
  duration = 0,
  className,
  backgroundEffect = true,
  textEffect = true,
  backgroundStyle = {
    fromColor: "green-500",
    toColor: "blue-700",
  },
}: {
  text: string;
  duration?: number;
  className?: string;
  backgroundEffect?: boolean;
  textEffect?: boolean;
  backgroundStyle?: {
    fromColor?: string;
    toColor?: string;
  };
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMoveCapture={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        {backgroundEffect && (
          <div className="pointer-events-none">
            <div className="absolute inset-0  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${backgroundStyle.fromColor} to-${backgroundStyle.toColor} opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500`}
              style={style}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
              style={style}
            >
              {/* <p className=" w-screen inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
                {randomString}
              </p> */}
            </motion.div>
          </div>
        )}

        {textEffect ? (
          <svg
            ref={svgRef}
            width="70%"
            height="70%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            className="select-none relative z-10"
          >
            <defs>
              <linearGradient
                id="textGradient"
                gradientUnits="userSpaceOnUse"
                cx="50%"
                cy="50%"
                r="25%"
              >
                {hovered && (
                  <>
                    <stop offset="0%" stopColor={"var(--yellow-500)"} />
                    <stop offset="25%" stopColor={"var(--red-500)"} />
                    <stop offset="50%" stopColor={"var(--blue-500)"} />
                    <stop offset="75%" stopColor={"var(--cyan-500)"} />
                    <stop offset="100%" stopColor={"var(--violet-500)"} />
                  </>
                )}
              </linearGradient>

              <motion.radialGradient
                id="revealMask"
                gradientUnits="userSpaceOnUse"
                r="20%"
                animate={maskPosition}
                transition={{ duration: duration, ease: "easeOut" }}
              >
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </motion.radialGradient>
              <mask id="textMask">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#revealMask)"
                />
              </mask>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.3"
              className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-3xl"
              style={{ opacity: hovered ? 0.7 : 0 }}
            >
              {text}
            </text>
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.3"
              className="font-[helvetica] font-bold fill-transparent text-3xl stroke-neutral-200 dark:stroke-neutral-800"
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
            >
              {text}
            </motion.text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="url(#textGradient)"
              strokeWidth="0.3"
              mask="url(#textMask)"
              className="font-[helvetica] font-bold fill-transparent text-3xl"
            >
              {text}
            </text>
          </svg>
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-4xl">
              <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
              <span className="dark:text-white text-black z-20">{text}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveHoverComponent;
