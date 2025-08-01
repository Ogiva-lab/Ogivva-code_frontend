import { Routes, Route } from "react-router-dom";
import "./App.css";

import OnboardingPage from "./pages/OnboardingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking authentication...</p>
      </div>
    );
  }

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  return (
    <div className="min-h-screen bg-white font-jakarta">
      <Routes>
        <Route path="/" element={<div>Landing Page</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-password-successful" element={<PasswordResetSuccessful />} />
      </Routes>
    </div>
  );
}

export default App;
