import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "./SideNavbar-img/dashboard.svg";
import DashboardIconActive from "./SideNavbar-img/dashboard-active.svg";
import GiftIcon from "./SideNavbar-img/gift.svg";
import GiftIconActive from "./SideNavbar-img/gift-active.svg";
import ArrowDown from "./SideNavbar-img/arrow-down.svg";
import ArrowUpActive from "./SideNavbar-img/arrow-up-active.svg";
import GiftMenuActive from "./SideNavbar-img/drpdwn-menu-active-bullet.svg";
import MomentIcon from "./SideNavbar-img/moments.svg";
import WalletIcon from "./SideNavbar-img/wallet.svg";
import MessageIcon from "./SideNavbar-img/message.svg";
import SettingsIcon from "./SideNavbar-img/setting.svg";
import HelpIcon from "./SideNavbar-img/help.svg";
import LogoutIcon from "./SideNavbar-img/logout.svg";

export default function Navbar({
  onSelect,
}: {
  onSelect: (section: string) => void;
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("Dashboard");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);

  const handleLogout = () => {
    // TODO: clear auth state, tokens, etc.
    navigate("/signin");
  };

  const navLinks = [
    {
      id: "Dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
      path: "/dashboard",
    },
    {
      id: "Gifts",
      label: "Gifts",
      icon: GiftIcon,
      activeIcon: GiftIconActive,
      hasDropdown: true,
      path: "/gifts",
      submenu: [
        { id: "My Gifts", label: "My Gifts" },
        { id: "Create Gift", label: "Create Gift" },
        { id: "Saved Ideas", label: "Saved Ideas" },
      ],
    },
    {
      id: "Moments",
      label: "Moments",
      icon: MomentIcon,
      path: "/moments",
    },
    {
      id: "Wallet",
      label: "Wallet",
      icon: WalletIcon,
      path: "/wallet",
    },
    {
      id: "Messages",
      label: "Messages",
      icon: MessageIcon,
      path: "/messages",
    },
  ];

  const footerLinks = [
    {
      id: "Settings",
      label: "Settings",
      icon: SettingsIcon,
      path: "/settings",
    },
    {
      id: "Help",
      label: "Help",
      icon: HelpIcon,
      path: "/help",
    },
  ];

  const handleSelect = (link: typeof navLinks[0]) => {
    setActive(link.id);
    setActiveSubsection(null);
    onSelect(link.id);
    navigate(link.path);
    if (!link.hasDropdown) {
      setOpenDropdown(false);
    } else {
      setOpenDropdown(!openDropdown);
    }
  };

  const handleSubSelect = (subId: string) => {
    setActive("Gifts");
    setActiveSubsection(subId);
    onSelect(subId);
  };

  return (
    <div className="w-[250px] fixed left-0 top-0 h-screen bg-white border-r border-[#E7EAEE] flex flex-col justify-between px-8 py-6 z-10">
      <div>
        <div className="text-3xl font-semibold font-fredoka tracking-wider text-[#19BD42]">GIVVA</div>
        <nav className="mt-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <div key={link.id} className="space-y-1">
                <button
                  onClick={() => handleSelect(link)}
                  className={`flex items-center justify-between w-full text-left gap-3 pl-4 pr-3 py-2 rounded-xl ${
                    isActive
                      ? "bg-[#19BD42] text-[#E8FBED] font-medium"
                      : "text-[#64748B] hover:bg-[#E8FBED] hover:text-[#19BD42]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <img
                      src={isActive && link.activeIcon ? link.activeIcon : link.icon}
                      alt={link.label}
                      className="w-4 h-4"
                    />
                    {link.label}
                  </span>
                  {link.hasDropdown && (
                    <img
                      src={openDropdown ? ArrowUpActive : ArrowDown}
                      alt="Toggle"
                      className="w-3 h-3"
                    />
                  )}
                </button>
                {/* Submenu */}
                {link.hasDropdown && openDropdown && (
                  <div className="ml-8 space-y-1">
                    {link.submenu?.map((sub) => {
                      const isSubActive = activeSubsection === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubSelect(sub.id)}
                          className={`flex items-center gap-2 w-full text-left px-3 py-1 rounded ${
                            isSubActive
                              ? "bg-[#19BD42] text-[#E8FBED] font-medium"
                              : "text-[#64748B] hover:bg-[#E8FBED] hover:text-[#19BD42]"
                          }`}
                        >
                          {isSubActive && (
                            <img
                              src={GiftMenuActive}
                              alt="Active"
                              className="w-2 h-2"
                            />
                          )}
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="mb-4 space-y-1">
        <hr className="w-full mx-auto border border-[#E7EAEE] my-6" />
        {footerLinks.map((link) => {
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => {
                setActive(link.id);
                setActiveSubsection(null);
                navigate(link.path);
                onSelect(link.id);
              }}
              className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl ${
                isActive
                  ? "bg-[#19BD42] text-[#E8FBED] font-medium"
                  : "text-[#64748B] hover:bg-[#E8FBED] hover:text-[#19BD42]"
              }`}
            >
              <img src={link.icon} alt={link.label} className="w-4 h-4" />
              {link.label}
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-[#64748B] hover:bg-[#E8FBED] hover:text-[#19BD42] w-full rounded-xl"
        >
          <img src={LogoutIcon} alt="Logout" className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
