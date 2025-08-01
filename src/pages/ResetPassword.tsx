import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import PasswordStrengthMeter from "../components/PasswordStrength";
import GivvaIcon from "../images/GIVVAIcon.svg";
import PhotoSlide from "../components/PhotoSlide";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { isLoading, resetPassword, error } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    try {
      const message = await resetPassword(token, password);
      toast.success(message);
      navigate("/reset-password-successful");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <main className="flex w-screen bg-white p-4 h-screen overflow-hidden">
      {/* Left panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <div>
          <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">Reset Password</h1>
          <p className="text-[#64748B] text-sm mb-5">
            Create a new password to regain access to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-xs flex-grow">
          {/* Password */}
          <div className="flex flex-col text-xs">
            <label htmlFor="password" className="mb-1 font-medium text-[#344054]">New Password</label>
            <div className="flex items-center gap-2 border border-[#D0D5DD] rounded-md px-3 py-2 focus-within:ring-[#19BD42] focus-within:border-[#19BD42] transition">
              <Lock className="text-[#191D23] w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#191D23] ml-1"
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {password.length > 0 && <PasswordStrengthMeter password={password} />}
          {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

          <motion.button
            type="submit"
            className="mt-4 bg-[#19BD42] text-[#E8FBED] py-1.5 rounded-md font-medium text-sm transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin w-4 h-4 mx-auto" /> : "Change Password"}
          </motion.button>
        </form>
      </div>

      {/* Right panel */}
      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}
