import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

const Layout = ({ children, title }) => {
  const t = `${title} - Joanna`;
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{
        position: "relative",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "backdrop-filter 0.3s ease-out",
      }}
    >
      <>{children}</>
    </motion.article>
  );
};

export default Layout;
