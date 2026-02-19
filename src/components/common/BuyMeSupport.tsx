"use client";

/**
 * Reusable "Buy Me a Coffee / Chai" support modal.
 * Asks "Are you from India?" and redirects to chai (India) or coffee (other).
 *
 * Usage in any project:
 * 1. Copy this file (and ensure framer-motion is installed).
 * 2. Import: import { BuyMeSupportModal, useBuyMeSupport } from '@/components/BuyMeSupport';
 * 3. In your component:
 *    const { isOpen, open, close } = useBuyMeSupport();
 *    return (
 *      <>
 *        <button onClick={open}>Buy me a coffee</button>
 *        <BuyMeSupportModal open={isOpen} onClose={close} chaiUrl="..." coffeeUrl="..." />
 *      </>
 *    );
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface BuyMeSupportProps {
  /** URL for Buy Me a Chai (India) */
  chaiUrl: string;
  /** URL for Buy Me a Coffee (rest of world) */
  coffeeUrl: string;
  /** Whether the modal is open (controlled) */
  open: boolean;
  /** Called when modal should close (e.g. close button, ESC) */
  onClose: () => void;
  /** Optional: custom question text */
  question?: string;
  /** Optional: custom subtitle text */
  subtitle?: string;
}

/**
 * Modal that asks "Are you from India?" and redirects to chai (India) or coffee (other).
 * Handles ESC key to close. Use with useBuyMeSupport() or your own open/close state.
 */
export function BuyMeSupportModal({
  chaiUrl,
  coffeeUrl,
  open,
  onClose,
  question = "Are you from India?",
  subtitle = "Choose your preferred payment method",
}: BuyMeSupportProps) {
  const scrollRestoreRef = useRef(0);

  const handleChoice = (isIndia: boolean) => {
    onClose();
    const url = isIndia ? chaiUrl : coffeeUrl;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    if (open) {
      scrollRestoreRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const centerPosition = (pageHeight - viewportHeight) / 2;
      window.scrollTo({ top: centerPosition, behavior: "smooth" });
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
        window.scrollTo({ top: scrollRestoreRef.current, behavior: "smooth" });
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            // Close modal when clicking backdrop
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="relative bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 sm:p-10 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
              {question}
            </h3>
            <p className="text-sm text-gray-400 mb-8 text-center">{subtitle}</p>
            <div className="flex flex-row gap-4 flex-nowrap justify-center">
              <button
                type="button"
                onClick={() => handleChoice(true)}
                className="flex-1 min-w-0 px-8 py-3.5 rounded-full bg-[#4fd1c5] hover:bg-[#3ba89c] text-[#121212] font-semibold text-base transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleChoice(false)}
                className="flex-1 min-w-0 px-8 py-3.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-semibold text-base transition-all cursor-pointer border border-gray-600 hover:border-gray-500 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to control the Buy Me Support modal.
 * Returns open state and open/close handlers.
 */
export function useBuyMeSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
}
