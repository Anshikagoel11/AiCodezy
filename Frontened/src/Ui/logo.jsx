import {motion} from 'framer-motion'
import {
  Code
} from "react-feather";
const Logo = () => (
   
  <motion.div 
    className="mb-2 flex items-center space-x-2"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
     <Code className="text-orange-400 font-bold" size={35} />
    <motion.h1 
      className="text-4xl font-bold bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-900 bg-clip-text text-transparent"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    >
      AiCodezy
    </motion.h1>
  </motion.div>
);
export default Logo;