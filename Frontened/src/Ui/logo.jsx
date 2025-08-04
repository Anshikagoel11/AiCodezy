import {motion} from 'framer-motion'

const Logo = () => (
  <motion.div 
    className="mb-2 flex flex-col items-center"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    
    <motion.h1 
      className="text-4xl font-bold bg-gradient-to-r from-green-300 via-blue-300 to-blue-900 bg-clip-text text-transparent"
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