"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useUiStore } from "@/stores";

export function LoadingScreen() {
  const { loadingScreen, setLoadingScreen } = useUiStore();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLoadingScreen(false), reduceMotion ? 200 : 1400);
    return () => clearTimeout(t);
  }, [reduceMotion, setLoadingScreen]);

  if (!loadingScreen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-comfort-ink text-comfort-sand"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => undefined}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40"
          animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="display text-2xl tracking-[0.2em] text-accent">C</span>
        </motion.div>
        <p className="display text-sm tracking-[0.35em] uppercase text-comfort-sand/70">
          Comfort
        </p>
        <div className="mx-auto mt-8 h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-accent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
