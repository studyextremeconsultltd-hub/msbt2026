import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { courses } from "@/data/msbt";

type Slot = {
  id: string;
  side: "left" | "right";
  top: string;
  floatDelay: number;
  floatDuration: number;
  rotateOffset: number;
  rotateMs: number;
};

const SLOTS: Slot[] = [
  { id: "l1", side: "left", top: "10%", floatDelay: 0, floatDuration: 4.6, rotateOffset: 0, rotateMs: 3200 },
  { id: "l2", side: "left", top: "42%", floatDelay: 0.5, floatDuration: 5.1, rotateOffset: 3, rotateMs: 3800 },
  { id: "l3", side: "left", top: "74%", floatDelay: 0.9, floatDuration: 4.9, rotateOffset: 6, rotateMs: 3500 },
  { id: "r1", side: "right", top: "10%", floatDelay: 0.25, floatDuration: 5.3, rotateOffset: 1, rotateMs: 3400 },
  { id: "r2", side: "right", top: "42%", floatDelay: 0.65, floatDuration: 4.7, rotateOffset: 4, rotateMs: 3600 },
  { id: "r3", side: "right", top: "74%", floatDelay: 1.0, floatDuration: 5.0, rotateOffset: 7, rotateMs: 3900 },
];

function RotatingBubble({ slot }: { slot: Slot }) {
  const [index, setIndex] = useState(slot.rotateOffset % courses.length);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % courses.length);
    }, slot.rotateMs);
    return () => clearInterval(id);
  }, [slot.rotateMs]);

  const course = courses[index];

  return (
    <motion.div
      className={`absolute w-[190px] lg:w-[210px] ${
        slot.side === "left" ? "left-0 lg:left-1 xl:left-4" : "right-0 lg:right-1 xl:right-4"
      }`}
      style={{ top: slot.top }}
      initial={{ opacity: 0, x: slot.side === "left" ? -50 : 50 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -14, 0, 10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: slot.floatDelay },
        x: { type: "spring", stiffness: 65, damping: 13, delay: slot.floatDelay },
        y: {
          duration: slot.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: slot.floatDelay,
        },
      }}
    >
      <Link
        to={`/courses/${course.slug}`}
        className="group block rounded-full bg-ink px-4 py-3 shadow-lg ring-1 ring-white/10 transition hover:scale-[1.03] hover:bg-black hover:shadow-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={course.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-white">
              {course.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function FloatingCourseBubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {SLOTS.map((slot) => (
        <div key={slot.id} className="pointer-events-auto">
          <RotatingBubble slot={slot} />
        </div>
      ))}
    </div>
  );
}
