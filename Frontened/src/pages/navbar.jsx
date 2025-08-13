import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code,
  LogOut,
  User,
  Menu,
  GitBranch,
  MessageSquare,
  Home,
  BarChart2
} from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handelNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="bg-[#0f0f0f] pt-3 ">
      <nav className="bg-black/70 border backdrop-blur-sm border-b-1 border-gray-900 rounded-xl px-4 py-4 mx-4 shadow-xl m-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Code className="text-orange-400" size={24} />
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-900 bg-clip-text text-transparent">
              AiCodezy
            </span>
          </motion.div>

          {/* Navigations */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem icon={<Home size={18} />} text="Home" onClick={() => handelNavigation('')} />
            <NavItem icon={<User size={18} />} text="About" onClick={() => handelNavigation('about')} />
            <NavItem icon={<Code size={18} />} text="Problems" onClick={() => handelNavigation('problems')} />
            <NavItem icon={<GitBranch size={18} />} text="Discuss" onClick={() => handelNavigation('discuss')} />
            <NavItem icon={<BarChart2 size={18} />} text="Visualize DSA" onClick={() => window.location.href = 'https://sortify-dsa.vercel.app/'} />
          </div>

          {/* Auth/Profile */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {}}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center">
                    <User className="text-orange-700" size={16} />
                  </div>
                  <span className="text-white hidden md:inline">{user.firstName}</span>
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button
                  onClick={() => navigate('/auth')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-white hover:bg-gray-800/70 rounded-xl hidden sm:block"
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => navigate('/auth')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-500/10 text-white rounded-xl shadow-lg hidden sm:block"
                >
                  Sign Up
                </motion.button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden mt-4 space-y-2"
          >
            <MobileNavItem icon={<Home size={18} />} text="Home" onClick={() => handelNavigation('')} />
            <MobileNavItem icon={<User size={18} />} text="About" onClick={() => handelNavigation('about')} />
            <MobileNavItem icon={<Code size={18} />} text="Problems" onClick={() => handelNavigation('problems')} />
            <MobileNavItem icon={<GitBranch size={18} />} text="Discuss" onClick={() => handelNavigation('discuss')} />
            <MobileNavItem icon={<BarChart2 size={18} />} text="Visualize DSA" onClick={() => window.location.href = 'https://sortify-dsa.vercel.app/'} />
            {!isAuthenticated && (
              <>
                <MobileNavItem text="Sign In" />
                <MobileNavItem
                  text="Sign Up"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                />
              </>
            )}
          </motion.div>
        )}
      </nav>
    </div>
  );
}

// Reusable Nav Item Component
function NavItem({ icon, text, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="px-3 py-2 text-gray-300 hover:text-white flex items-center space-x-2 rounded-xl hover:bg-gray-800/50"
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
}

// Mobile Nav Item Component
function MobileNavItem({ icon, text, className = "", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`w-full px-4 py-3 text-left text-gray-300 hover:text-white flex items-center space-x-3 rounded-lg ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </motion.button>
  );
}