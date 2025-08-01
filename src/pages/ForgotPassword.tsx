import GivvaIcon from "../images/GIVVAIcon.svg";
import PhotoSlide from "../components/PhotoSlide";
import { motion } from "framer-motion";
import { Mail, Loader, Repeat } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const { forgotPassword, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Reset link sent. Please check your email.");
      setLinkSent(true);
    } catch {
      toast.error("Failed to send reset link.");
      setLinkSent(false);
    }
  };

  return (
    <main className="flex w-screen bg-white p-4 h-screen overflow-hidden">
      {/* left panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <div>
          <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">
            Reset your password
          </h1>
          <p className="text-[#64748B] text-sm mb-5">
            No worries — it happens to the best of us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-xs flex-grow">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-[#344054]">
              Email
            </label>
            <div className="flex items-center gap-2 border border-[#D0D5DD] rounded-md px-3 py-2 focus-within:ring-[#19BD42] focus-within:border-[#19BD42] transition">
              <Mail className="text-[#191D23] w-4 h-4" />
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                required
                disabled={linkSent}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-semibold mt-1">{error}</p>
          )}

          {linkSent ? (
            <>
              <p className="text-green-600 text-xs font-medium mt-2">
                ✅ Reset link sent successfully.
              </p>
              <motion.button
                type="submit"
                className="mt-2 border border-[#19BD42] text-[#19BD42] py-1.5 rounded-md font-medium text-sm transition flex items-center justify-center gap-1"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    <Repeat className="w-4 h-4" />
                    Resend Link
                  </>
                )}
              </motion.button>
            </>
          ) : (
            <motion.button
              type="submit"
              className="mt-4 bg-[#19BD42] text-[#E8FBED] py-1.5 rounded-md font-medium text-sm transition"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin w-4 h-4 mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-1 bg-[#E8FBED] text-[#19BD42] py-1.5 rounded-md font-medium text-sm transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Back to Login
          </motion.button>
        </form>
      </div>

      {/* right panel */}
      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}
