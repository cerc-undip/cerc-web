"use client";

import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/shadcn-io/terminal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration = last delay (3300) + brief wait to read (1200ms)
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 400); // Wait for exit animation
    }, 4500);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4"
    >
      <Terminal>
        <AnimatedSpan delay={0}>$ npm install cerc-website</AnimatedSpan>
        <TypingAnimation delay={500} duration={25}>
          Installing dependencies...
        </TypingAnimation>
        <AnimatedSpan delay={1400}>
          ✓ Package installed successfully
        </AnimatedSpan>
        <AnimatedSpan delay={1800}>$ npm run dev</AnimatedSpan>
        <TypingAnimation delay={2300} duration={25}>
          Starting development server...
        </TypingAnimation>
        <AnimatedSpan delay={3300} className="text-green-500">
          🚀 Server ready at https://cerc.site
        </AnimatedSpan>
      </Terminal>
    </motion.div>
  );
}