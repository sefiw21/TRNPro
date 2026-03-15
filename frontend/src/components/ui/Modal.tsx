import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ModalProps {
  CloseModal: () => void;
  children: React.ReactNode;
}

const User_Detail_Modal: React.FC<ModalProps> = ({ CloseModal, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={CloseModal}
    >
      {/* Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="
      fixed inset-0
      bg-blue-700/5
      backdrop-blur-md
    "
      />

      <AnimatePresence>
        {/* Modal Container */}
        <div
          className="relative z-50 flex max-h-[90vh] w-full max-w-2xl flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
              duration: 0.3,
            }}
            className="
          relative flex w-full flex-col overflow-hidden
          rounded-3xl border border-gray-700/50
          bg-linear-to-br from-gray-900 via-gray-900 to-gray-800
          shadow-2xl backdrop-blur-xl
        "
            style={{
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Scrollable Content Area */}
            <div
              className="relative max-h-[70vh] flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(156, 163, 175, 0.3) transparent",
              }}
            >
              <div className="p-2">{children}</div>
            </div>

            {/* Close Button */}
            <motion.button
              onClick={CloseModal}
              className="
            absolute right-5 top-5 flex h-10 w-10 items-center justify-center
            rounded-2xl text-xl font-bold text-white
            transition-all duration-300 hover:text-gray-400
          "
            >
              <span className="bg-transparent">✕</span>
            </motion.button>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};
export default User_Detail_Modal;
