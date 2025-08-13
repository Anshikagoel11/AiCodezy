import { motion} from "framer-motion";

export default function FloatingBackground(){
    return(
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-purple-200/5 "
                    style={{
                      width: Math.random() * 100 + 100,
                      height: Math.random() * 100 + 100,
                    }}
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                      x: [null, Math.random() * window.innerWidth],
                      y: [null, Math.random() * window.innerHeight],
                    }}
                    transition={{
                      duration: Math.random() * 30 + 20,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
    )
}