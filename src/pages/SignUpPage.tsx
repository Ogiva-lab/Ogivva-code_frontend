import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrength";
import { Mail, Lock, User, Eye, EyeOff, Loader } from "lucide-react";
import GivvaIcon from "../images/GIVVAIcon.svg";
import FacebookIcon from "../images/Facebook.svg";
import GoogleIcon from "../images/Google.svg";
import PhotoSlide from "../components/PhotoSlide";
import { useAuthStore } from "../stores/authStore";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { signup, error, isLoading, role, setRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stateRole = (location.state as { role?: string })?.role;

    if (stateRole) {
      setRole(stateRole);
    }

    if (!stateRole && !role) {
      alert("Please select a role before signing up.");
      navigate("/onboarding");
    }
  }, [location.state, role, setRole, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      alert("Role is required to create an account.");
      return;
    }

    try {
      await signup(email, password, name, role);
      navigate("/verify-email");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <main className="flex w-screen bg-white p-4 h-screen">
      {/* Left panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col overflow-y-auto scrollbar-hidden">
        <div>
          <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">
            Create an account with Givva
          </h1>
          <p className="text-[#64748B] text-sm mb-5">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#349041] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-2 text-xs flex-grow justify-center"
        >
          {/* Name */}
          <div className="flex flex-col text-xs">
            <label htmlFor="name" className="mb-1 font-medium text-[#344054]">
              Name
            </label>
            <div className="flex items-center gap-2 border border-[#D0D5DD] rounded-md px-3 py-2 focus-within:ring-[#19BD42] focus-within:border-[#19BD42] transition">
              <User className="text-[#191D23] w-4 h-4" />
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col text-xs">
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
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col text-xs">
            <label htmlFor="password" className="mb-1 font-medium text-[#344054]">
              Password
            </label>
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
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error / Password strength */}
          {error && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">{error}</p>
          )}
          {password.length > 0 && <PasswordStrengthMeter password={password} />}

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs mt-1.5">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 accent-green-500 rounded-sm"
              required
            />
            <label htmlFor="terms" className="text-gray-600 leading-snug">
              I agree to the{" "}
              <Link to="/terms" className="text-[#19BD42] hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#19BD42] hover:underline">
                Privacy Policy
              </Link>.
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="mt-2 bg-[#19BD42] text-[#E8FBED] py-1.5 rounded-md font-medium text-sm transition"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Social buttons */}
        <AnimatePresence>
            <motion.div
              key="social-buttons"
              className="flex flex-col gap-2 mt-2 mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 my-3">
                <hr className="flex-grow border-t border-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-grow border-t border-gray-200" />
              </div>
              <a
                href={`http://localhost:2000/api/auth/google?role=${role || ""}`}
                className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md text-sm hover:bg-gray-50"
              >
                <img src={GoogleIcon} alt="Google icon" className="w-5 h-5" />
                Sign up with Google
              </a>
              <a
                href={`http://localhost:2000/api/auth/facebook?role=${role || ""}`}
                className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md text-sm hover:bg-gray-50"
              >
                <img src={FacebookIcon} alt="Facebook icon" className="w-5 h-5" />
                Sign up with Facebook
              </a>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}