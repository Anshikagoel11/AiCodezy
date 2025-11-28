import { motion } from "framer-motion";
import { Linkedin, Mail } from "react-feather";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800/50 py-10 px-4 relative overflow-hidden">
      {/* Background elements matching the rest of the site */}
      <motion.div
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-10 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-xl"
      />
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-10 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-600/10 to-transparent blur-xl"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-500">
              AiCodezy
            </h3>
            <p className="text-gray-400 text-sm mt-1">Intelligent coding solutions</p>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex space-x-6"
          >
            <a
              href="https://www.linkedin.com/in/anshika-goel-25b537314/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center mr-2 group-hover:bg-indigo-500/10 transition-colors">
                <Linkedin size={16} />
              </div>
              <span>LinkedIn</span>
            </a>
            
            <a
              href="mailto:anshikadevv10@gmail.com"
              className="flex items-center text-gray-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center mr-2 group-hover:bg-amber-500/10 transition-colors">
                <Mail size={16} />
              </div>
              <span>Email</span>
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} AiCodezy. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}