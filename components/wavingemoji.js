import React from "react";
import { motion } from "framer-motion";

const WavingEmoji = () => {
  return (
    <motion.span
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0, 0], // Sequence of rotation values
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      style={{
        display: "inline-block",
        transformOrigin: "center",
        fontSize: "48px", // Adjust the font size to make the emoji bigger
      }}
    >
      👋
    </motion.span>
  );
};

export default WavingEmoji;
