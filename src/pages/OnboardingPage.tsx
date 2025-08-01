import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GivvaIcon from "../images/GIVVAIcon.svg";
import VendorIcon from "../images/vendorIcon.svg";
import GifterIcon from "../images/gifterIcon.svg";
import RecieverIcon from "../images/recieverIcon.svg";
import PhotoSlide from "../components/PhotoSlide";
import { useAuthStore } from "../stores/authStore";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setRole } = useAuthStore();

  const handleSelectRole = (role: string) => {
    setRole(role); // Save to store & localStorage
    navigate("/signup", { state: { role } });
  };

  const roleCard = (
    role: string,
    icon: string,
    title: string,
    description: string
  ) => (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -2,
        backgroundColor: "#f0fdf4",
        boxShadow: "0px 6px 18px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.2 }}
      className="border border-[#D0D5DD] rounded-lg py-4 px-7 flex items-start gap-4 cursor-pointer transition-all"
      onClick={() => handleSelectRole(role)}
    >
      <img src={icon} alt={`${title} Icon`} className="w-8" />
      <div className="max-w-[352px]">
        <h2 className="mb-1 font-semibold text-[#191D23] text-sm">{title}</h2>
        <p className="text-[#64748B] text-xs w-[280px]">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <main className="flex w-screen bg-white p-4 h-screen">
      <div className="w-[40%] px-8 py-5 flex flex-col">
        <img src={GivvaIcon} alt="Givva Logo" className="mb-5 w-20 mx-auto" />
        <h1 className="text-xl font-semibold text-[#191D23] mb-1">
          Let’s get you started
        </h1>
        <p className="text-[#64748B] text-sm mb-5">
          Tell us what you’d like to do on GIVVA. You can always switch roles later.
        </p>

        <div className="flex flex-col gap-4">
          {roleCard(
            "gifter",
            GifterIcon,
            "Gifter",
            "Share joy with someone you know — or a stranger who needs it."
          )}
          {roleCard(
            "reciever",
            RecieverIcon,
            "Receiver",
            "Lucky you! Claim your gift and see what surprises await."
          )}
          {roleCard(
            "vendor",
            VendorIcon,
            "Vendor",
            "Reach new customers, fulfill meaningful orders, and grow your impact."
          )}
        </div>

        <p className="text-[#64748B] text-sm mt-5">
          Already have an account?{" "}
          <a href="/signin" className="text-[#349041] hover:underline">
            Sign In
          </a>
        </p>
      </div>

      <div className="flex-grow h-full rounded-2xl overflow-hidden">
        <PhotoSlide />
      </div>
    </main>
  );
}