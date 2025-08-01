import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import GivvaIcon from "../images/GIVVAIcon.svg";
import PhotoSlide from "../components/PhotoSlide";
import { useWindowSize } from "@react-hook/window-size";
import confettiIcon from "../images/confetti 1.svg"

export default function PasswordResetSuccessful() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Use window size for confetti
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/signin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <main className="flex w-screen bg-white p-4 h-screen relative">
      {/* Confetti */}
      <Confetti width={width} height={height} numberOfPieces={400} recycle={countdown > 0} />

      {/* Left Panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col z-10">
        <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center items-center my-auto"
        >
          <img src={confettiIcon} alt="confetti image" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">
            Password Changed
          </h1>
          <p className="text-[#64748B] text-sm w-80 text-center mb-4">
            Your password has been changed successfully.
            You will be redirected to the sign in page in{" "}
            <span className="font-semibold text-black">
              {`00:${countdown.toString().padStart(2, "0")}`}
            </span>.
          </p>

          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-2 bg-[#19BD42] hover:bg-[#169838] text-[#E8FBED] py-1.5 px-4 rounded-md font-medium text-sm transition"
          >
            Sign in now
          </button>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-grow h-full rounded-2xl overflow-hidden z-0">
        <PhotoSlide />
      </div>
    </main>
  );
}
