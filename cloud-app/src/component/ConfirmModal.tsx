import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            
            <h2 className="text-2xl font-serif italic mb-2">{title}</h2>
            <p className="text-neutral-400 text-sm mb-8">{message}</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { onConfirm(); onClose(); }}
                className="bg-red-500 text-white font-bold py-4 rounded-2xl hover:bg-red-600 transition-colors uppercase text-[10px] tracking-widest"
              >
                Yes, Clear Bag
              </button>
              <button 
                onClick={onClose}
                className="bg-white/5 text-neutral-400 font-bold py-4 rounded-2xl hover:text-white transition-colors uppercase text-[10px] tracking-widest"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};