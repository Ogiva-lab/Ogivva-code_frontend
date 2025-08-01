import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTopUpStore } from "../../stores/topUpStore.tsx";
import Exit from "./TopUpModal-img/close-square.svg";
import SelectAmount from "./SelectAmount";
import ChoosePaymentMethod from "./ChoosePaymentMethod";
import AddBankOrCard from "./AddBankOrCard";
import TopUpSuccess from "./TopUpSuccess";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

type TopUpModalProps = {
  onClose: () => void;
};

const TopUpModal = ({ onClose }: TopUpModalProps) => {
  const { isModalOpen, currentPhase } = useTopUpStore();
  const [width, height] = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (currentPhase === 4) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // confetti lasts 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentPhase]);

  if (!isModalOpen) return null;

  function headDisplay(): string {
    if (currentPhase === 1) return "Top-Up Modal";
    if (currentPhase === 4) return "";
    return "Payment Method";
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full max-w-[600px] h-[75%] p-6 rounded-xl shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Confetti for Phase 4 */}
          {showConfetti && currentPhase === 4 && (
            <Confetti
              width={width}
              height={height}
              numberOfPieces={350}
              recycle={false}
            />
          )}

          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{headDisplay()}</h2>
            <img
              src={Exit}
              alt="close modal"
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>

          {/* Dynamic Content */}
          {currentPhase === 1 && <SelectAmount />}
          {currentPhase === 2 && <ChoosePaymentMethod />}
          {currentPhase === 3 && <AddBankOrCard />}
          {currentPhase === 4 && <TopUpSuccess />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopUpModal;
