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
        fontSize: "58px", // Adjust the font size to make the emoji bigger
        marginLeft: "10px", // Adjust the margin to make the emoji centered
        marginRight: "10px", // Adjust the margin to make the emoji centered
      }}
    >
      👋
    </motion.span>
  );
};

export default WavingEmoji;
