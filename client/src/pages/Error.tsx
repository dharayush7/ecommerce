import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Floating animation for bubbles
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Fade in animation for container
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4"
    >
      <div className="max-w-2xl w-full text-center relative">
        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={floatingAnimation}
            className="absolute w-8 h-8 bg-gray-200 rounded-full opacity-30 left-20 top-20"
          />
          <motion.div
            animate={{ ...floatingAnimation, y: [0, -30, 0] }}
            className="absolute w-12 h-12 bg-gray-300 rounded-full opacity-30 right-32 top-40"
          />
          <motion.div
            animate={{ ...floatingAnimation, y: [0, -25, 0] }}
            className="absolute w-10 h-10 bg-gray-200 rounded-full opacity-30 left-40 top-64"
          />
        </div>

        {/* Main Content */}
        <div className="relative space-y-8">
          {/* Perfume Illustration */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg 
            flex items-center justify-center shadow-lg border border-gray-200"
          >
            <div className="w-16 h-32 bg-gradient-to-b from-gray-300 to-gray-100 rounded relative">
              {/* Perfume bottle neck */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-8 bg-gray-400 rounded-t" />
              {/* Liquid level */}
              <div className="absolute bottom-0 w-full h-8 bg-gray-200 opacity-50" />
            </div>
            <div className="absolute -bottom-4 w-24 h-1 bg-gray-300 rounded-full opacity-50" />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900 animate-pulse">
              404 - Scent Unbottled
            </h1>
            <h2 className="text-3xl font-semibold text-gray-800">
              Essence Not Found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              The fragrance you seek has evaporated into the ether. Like a rare
              top note, this page has fleeting presence. Let's rediscover
              timeless scents together.
            </p>
          </div>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-gray-900 to-black text-white px-8 py-3 rounded-full
            font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
          >
            Return to Fragrance Archive
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
