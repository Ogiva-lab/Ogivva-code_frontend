import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import GivvaIcon from "../images/GIVVAIcon.svg";
import PhotoSlide from "../components/PhotoSlide";

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isCooldownActive, setIsCooldownActive] = useState(true);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const { user, error, isLoading, verifyEmail } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isCooldownActive && resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    } else if (resendCooldown === 0) {
      setIsCooldownActive(false);
    }

    return () => clearTimeout(timer);
  }, [resendCooldown, isCooldownActive]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 4);
    if (!/^\d+$/.test(pasted)) return;

    const newCode = pasted.split("");
    setCode((prev) => {
      const updated = [...prev];
      for (let i = 0; i < 4; i++) {
        updated[i] = newCode[i] || "";
      }
      return updated;
    });

    setTimeout(() => {
      const nextIndex = Math.min(pasted.length, 3);
      inputRefs.current[nextIndex]?.focus();
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified!");
      navigate("/email-verified");
    } catch {
      toast.error("Verification failed. Try again.");
    }
  };

  const handleResend = () => {
    toast.success("Code resent to your email.");
    setResendCooldown(60);
    setIsCooldownActive(true);
    // TODO: call your backend resend endpoint here.
  };

  const handleChangeEmail = () => {
    navigate("/signup");
  };

  return (
    <main className="flex w-screen bg-white p-4 h-screen overflow-hidden">
      {/* Left panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <div>
          <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">Verify Code</h1>
          <p className="text-[#64748B] text-sm mb-2">
            We’ve sent a 4-digit code to <strong>{user?.email}</strong>
          </p>
        </div>

        <div className="w-full max-w-md mx-auto mt-7 border border-[#E7EAEE] p-6 rounded-md bg-white flex flex-col items-center justify-center gap-4">
          <p className="text-xs text-gray-500 text-center">
            You can resend a new code in{" "}
            <span className="font-semibold text-gray-700">
              {resendCooldown > 0
                ? `00:${resendCooldown.toString().padStart(2, "0")}`
                : "now"}
            </span>.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-16 h-16 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <motion.button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium text-sm transition"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin w-5 h-5 mx-auto" /> : "Verify Code"}
            </motion.button>

            <button
              type="button"
              className={`text-sm font-semibold ${
                isCooldownActive ? "text-gray-400" : "text-green-600"
              }`}
              disabled={isCooldownActive}
              onClick={handleResend}
            >
              Resend Code
            </button>

            <button
              type="button"
              onClick={handleChangeEmail}
              className="text-sm text-gray-500 underline"
            >
              Change Email Address
            </button>
          </form>
        </div>
      </div>

      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
};

