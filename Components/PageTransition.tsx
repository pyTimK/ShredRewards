import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBack } from "akar-icons";

interface PageTransitionProps {
  children: React.ReactNode;
  isReverse?: boolean;
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isReverse = false,
  duration = 0.3,
}) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ y: "-120vh", rotate: -20 }}
        animate={isReverse ? undefined : { y: 0, rotate: 0 }}
        // exit={exit}
        transition={{ duration }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 999,
          border: "2px solid black",
          backgroundColor: "white",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
