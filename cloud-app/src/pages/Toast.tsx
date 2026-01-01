import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          className="fixed bottom-10 right-10 z-100 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl min-w-[300px]"
        >
          <div className="bg-yellow-500/20 p-2 rounded-xl text-yellow-500">
            <CheckCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Success</p>
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
          
          {/* Progress Bar Timer */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3 }}
            className="absolute bottom-0 left-0 h-1 bg-yellow-500 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};