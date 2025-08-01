import ArrowDown from "./TopNavbar-img/arrow-down.svg";
import Bell from "./TopNavbar-img/notification-bing.svg";
import DefaultAvatar from "./TopNavbar-img/cheerful-curly-man-with-bristle-points-left-wears-casual-clothes-spectacles 1.png";
import { useAuthStore } from "../stores/authStore"; 

export default function TopNavbar() {
  const user = useAuthStore((state) => state.user); 

  const userName = user?.name || "User";
  const profileImage = user?.profileImage || DefaultAvatar;

  return (
    <header className="sticky top-0 z-20 flex justify-between items-center px-6 py-3 border-b bg-white text-[#36334B] border-[#E7EAEE]">
      {/* Left: Welcome text */}
      <div>
        <div className="text-base font-bold">
          Welcome back, {userName}! 👋
        </div>
        <p className="text-xs text-[#36334B]">
          Ready to spark joy today? Let’s see how far your kindness has traveled.
        </p>
      </div>

      {/* Right: Search, bell, user */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search here..."
          className="border border-gray-300 rounded-md px-3 py-1.5 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-[#19BD42]"
        />

        {/* Notification bell */}
        <div className="border-[#D6D9DE] border-1 p-2 rounded-lg flex">
          <button className="text-gray-500 hover:text-[#19BD42] my-auto">
            <img src={Bell} alt="Notifications" className="w-4 h-4" />
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            {userName}
          </span>
          <img src={ArrowDown} alt="Menu" className="w-3 h-3" />
        </div>
      </div>
    </header>
  );
}
