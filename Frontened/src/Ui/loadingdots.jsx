import { motion } from "framer-motion";

const dotVariants = {
  initial: { y: "0%" },
  animate: { y: "100%" },
};

const transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export default function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: 0.4 }}
      />
    </div>
  );
}