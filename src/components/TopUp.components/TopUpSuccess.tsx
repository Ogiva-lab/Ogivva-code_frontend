import { useEffect, useRef } from "react";
import { useTopUpStore } from "../../stores/topUpStore";
import confettiIcon from "./TopUpModal-img/confetti 1.svg";

const TopUpSuccess = () => {
  const { topUpAmount, closeModal, addToWallet } = useTopUpStore();

  // Prevent multiple calls to addToWallet
  const hasAdded = useRef(false);

  useEffect(() => {
    if (topUpAmount && !hasAdded.current) {
      addToWallet(topUpAmount);
      hasAdded.current = true;
    }
  }, [topUpAmount, addToWallet]);

  return (
    <div className="flex flex-col mt-9 justify-center items-center relative overflow-hidden">
      {/* Success Icon */}
      <img src={confettiIcon} alt="Confetti" className="w-20 h-20" />

      {/* Message */}
      <div className="text-center mt-5">
        <h1 className="text-xl font-semibold">Top-up successful</h1>
        <p className="text-xs w-68 mt-3 text-[#64748B]">
          Your wallet has been topped up with{" "}
          <span className="font-medium">
            ₦{topUpAmount?.toLocaleString()}
          </span>
          . Ready to spread some joy?
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-7 grid grid-cols-2 w-full gap-3">
        <button onClick={closeModal} className="button2">
          Close
        </button>
        <button onClick={closeModal} className="button1">
          Send Gift
        </button>
      </div>
    </div>
  );
};

export default TopUpSuccess;
