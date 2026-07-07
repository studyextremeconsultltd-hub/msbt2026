"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { students, type StudentAgent } from "@/data/students";

function SpeechBubble({ message, side }: { message: string; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -6 }}
      transition={{ duration: 0.35 }}
      className={`absolute z-20 max-w-[200px] rounded-2xl border border-white/10 bg-ink/90 px-3.5 py-2.5 text-[11px] leading-snug text-snow shadow-xl backdrop-blur-md sm:max-w-[240px] sm:text-xs ${
        side === "left" ? "-right-2 top-0 translate-x-full sm:-right-4" : "-left-2 top-0 -translate-x-full sm:-left-4"
      }`}
    >
      <span className="absolute top-4 h-2 w-2 rotate-45 border border-white/10 bg-ink/90" style={side === "left" ? { left: -5 } : { right: -5 }} />
      {message}
    </motion.div>
  );
}

function StudentAvatar({ student, active, message }: { student: StudentAgent; active: boolean; message: string }) {
  const side = parseFloat(student.position.left) > 50 ? "right" : "left";

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{ top: student.position.top, left: student.position.left }}
      animate={{
        y: student.float.y,
        x: student.float.x,
      }}
      transition={{
        duration: student.float.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        <motion.div
          animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`relative h-24 w-24 overflow-hidden rounded-full border-2 shadow-2xl transition-colors duration-500 lg:h-28 lg:w-28 ${
            active ? "border-cyan shadow-cyan/30" : "border-white/20"
          }`}
        >
          <Image src={student.image} alt={student.name} fill className="object-cover" sizes="112px" />
          {active && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-cyan/60"
              animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          )}
        </motion.div>

        <div className="mt-3 text-center">
          <div className="text-xs font-semibold text-snow">{student.name}</div>
          <div className="mt-0.5 max-w-[120px] text-[10px] leading-tight text-mist">{student.role}</div>
        </div>

        <AnimatePresence mode="wait">
          {active && message && <SpeechBubble key={message} message={message} side={side} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function AnimatedStudentCampus() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  const activeIndex = tick % students.length;
  const activeStudent = students[activeIndex];
  const messageIndex = Math.floor(tick / students.length) % activeStudent.messages.length;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora */}
      <motion.div
        className="absolute -left-32 top-0 h-[60vh] w-[60vh] rounded-full bg-cyan/10 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/4 h-[50vh] w-[50vh] rounded-full bg-indigo/10 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Connection lines between active students */}
      <svg className="absolute inset-0 h-full w-full opacity-20">
        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="35%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.line
          x1="18%"
          y1="70%"
          x2="75%"
          y2="65%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {students.map((student, i) => (
        <StudentAvatar
          key={student.id}
          student={student}
          active={i === activeIndex || i === (activeIndex + 1) % students.length}
          message={i === activeIndex ? student.messages[messageIndex] : ""}
        />
      ))}

      {/* Mobile: compact student strip */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-3 px-4 md:hidden">
        {students.map((s, i) => (
          <motion.div
            key={s.id}
            animate={{ scale: i === activeIndex ? 1.08 : 1, opacity: i === activeIndex ? 1 : 0.55 }}
            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20"
          >
            <Image src={s.image} alt={s.name} fill className="object-cover" sizes="48px" />
          </motion.div>
        ))}
      </div>

      {/* Live cohort indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-ink/80 px-4 py-2 text-xs text-mist backdrop-blur-md md:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live cohort · {students[activeIndex].name}: &ldquo;{students[activeIndex].messages[messageIndex]}&rdquo;
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/60 to-void" />
    </div>
  );
}
