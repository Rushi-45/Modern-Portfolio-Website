"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const HINT_DELAY_MS = 3500;
const HIDE_AFTER_SCROLL_PX = 80;

const ScrollHint = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    if (typeof window !== "undefined" && window.scrollY > HIDE_AFTER_SCROLL_PX) {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      if (window.scrollY < HIDE_AFTER_SCROLL_PX) setShow(true);
    }, HINT_DELAY_MS);

    const onScroll = () => {
      if (window.scrollY > HIDE_AFTER_SCROLL_PX) {
        setShow(false);
        setDismissed(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scroll-hint"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 229, 255, 0.35)",
                "0 0 0 10px rgba(0, 229, 255, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg"
          >
            <span className="font-medium tracking-wide">Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex"
            >
              <FiChevronDown className="w-4 h-4 text-cyan-400" />
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollHint;
