import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";

const Parents = () => {
  const location = useLocation();
  const FamilysTitle = [
    "ቤተ ቅዱስ ባስሊዎስ",
    "ቤተ ቅዱስ አትናቴዎስ",
    "ቤተ አባ ጊዎርጊስ ዘጋስጫ",
    "ቤተ ቅዱስ ጎርጎሬዎስ",
    "ቤተ ቅዱስ ፖሊካርፐስ",
    "ቤተ ቅዱስ ያሬድ",
    "ቤተ ቅዱስ ያዕቆብ ዘስሩግ",
    "ቤተ ቅዱስ ዮሀንስ አፈወርቅ",
  ];

  // Animation variants

const sidebarVariants: Variants = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
      when: "beforeChildren" // Added for better control
    }
  },
  exit: { // Added exit state
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const linkVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0 
  },
  hover: {
    scale: 1.05,
    x: 10,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { 
    scale: 0.95 
  },
  exit: { // Added exit state
    opacity: 0,
    x: -20
  }
};

const contentVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.22, 1, 0.36, 1] // Fixed: use easing array instead of string
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.2 
    }
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Modern Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-blue-500/30 shadow-2xl shadow-blue-900/30 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⚛️</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-linear-x">
                Family Dashboard
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="hidden md:flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Active • 8 Families</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Animated Sidebar */}
          <motion.aside 
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/4"
          >
            <div className="bg-linear-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/40 overflow-hidden">
              {/* Sidebar Header */}
              <div className="p-6 bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700/50">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-white flex items-center gap-3"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <span className="relative text-2xl">🏛️</span>
                  </div>
                  <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Holy Families
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-sm mt-2"
                >
                  Select a family to view details
                </motion.p>
              </div>

              {/* Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {FamilysTitle.map((family, index) => (
                    <motion.li
                      key={family}
                      variants={linkVariants}
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <Link
                        to={`/Admin/${family}`}
                        className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 bg-linear-to-r from-gray-800/50 to-gray-900/50 hover:from-blue-900/30 hover:to-purple-900/30 border border-gray-700/30 hover:border-blue-500/50"
                      >
                        {/* Active indicator */}
                        {location.pathname.includes(family) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-purple-600 rounded-r-full"
                          />
                        )}
                        
                        {/* Animated icon */}
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative w-8 h-8 bg-linear-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                            <span className="text-lg">{index + 1}</span>
                          </div>
                        </motion.div>
                        
                        {/* Link text */}
                        <div className="flex-1 min-w-0">
                          <span className="block font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                            {family}
                          </span>
                          <motion.span 
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors duration-300 truncate"
                          >
                            Click to explore
                          </motion.span>
                        </div>
                        
                        {/* Arrow indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="p-4 border-t border-gray-700/50 bg-linear-to-r from-gray-900/80 to-black/80"
              >
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Total Families</span>
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1.2 }}
                    className="bg-linear-to-r from-blue-600 to-purple-700 px-3 py-1 rounded-full text-white font-bold"
                  >
                    {FamilysTitle.length}
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.aside>

          {/* Main Content Area with Animation */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                <div className="bg-linear-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/40 h-full min-h-[500px]">
                  <Outlet />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Parents;