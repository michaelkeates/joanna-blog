import { AnimatePresence, motion } from "framer-motion";
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon, HomeIcon } from "@chakra-ui/icons";
import { IoIosHome } from 'react-icons/io'

import Link from "next/link";

const HomeButton = () => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      style={{ display: "inline-block" }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link href="/">
        <IconButton
          aria-label="Go to home"
          bg={useColorModeValue("#1c76c7", "#6023c0")}
          color={useColorModeValue("#ffffff", "#ffffff")}
          _hover={{
            bg: useColorModeValue("#1b60a6", "#7434db"),
          }}
          icon={<IoIosHome />}
        />
      </Link>
    </motion.div>
  </AnimatePresence>
);

export default HomeButton;
