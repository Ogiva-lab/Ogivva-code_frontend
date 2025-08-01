import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import GivvaIcon from "../images/GIVVAIcon.svg";
import FacebookIcon from "../images/Facebook.svg";
import GoogleIcon from "../images/Google.svg";
import PhotoSlide from "../components/PhotoSlide";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";

export default function SignInPage() {
  const navigate = useNavigate();
  const { isLoading, error } = useAuthStore();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuthStore();
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password, rememberMe);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <main className="flex w-screen bg-white p-4 h-screen overflow-hidden">
      {/* Left panel */}
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <div>
          <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
          <h1 className="text-xl font-semibold text-[#191D23] mb-1">Welcome back</h1>
          <p className="text-[#64748B] text-sm mb-2">
            New to GIVVA?{" "}
            <Link to="/signup" className="text-[#349041] hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-2 text-xs flex-grow justify-center">
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
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
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
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-green-500"
              />
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-green-500 font-medium"
            >
              Forgot your password?
            </Link>
          </div>

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
              "Sign In"
            )}
          </motion.button>

          {error && (
            <p className="text-red-500 text-xs font-semibold mt-[2px]">{error}</p>
          )}

          <div className="flex items-center gap-2 my-3">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          <a
            href="http://localhost:2000/api/auth/google"
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md text-sm hover:bg-gray-50"
          >
            <img src={GoogleIcon} alt="Google icon" className="w-4 h-4" />
            Continue with Google
          </a>

          <a
            href="http://localhost:2000/api/auth/facebook"
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md text-sm hover:bg-gray-50"
          >
            <img src={FacebookIcon} alt="Facebook icon" className="w-4 h-4" />
            Continue with Facebook
          </a>
        </form>
      </div>

      {/* Right panel */}
      <div className="flex-grow h-full rounded-l-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}
