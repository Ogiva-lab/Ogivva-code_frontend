import { useState } from "react";
import SideNavbar from "../components/SideNavbar";
import TopNavbar from "../components/TopNavbar";
import WalletCard from "../components/WalletCard";
import GiftHistoryTable from "../components/GiftHistoryTable";
import GiftsContent from "../components/GiftContent";
import MomentsContent from "../components/MomentsContent";
import SendGift from "../components/SendGift";
import TopUpModal from "../components/TopUp.components/TopUpModal";
import { useTopUpStore } from "../stores/topUpStore";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const { isModalOpen, openModal, closeModal } = useTopUpStore();

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Sidebar */}
      <div className="w-[250px] h-screen fixed left-0 top-0 z-10 border-r bg-white">
        <SideNavbar onSelect={setSelectedSection} />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col ml-[250px]">
        {/* Top Navbar */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <TopNavbar />
        </div>

        {/* Page Content */}
        <main className="py-5 px-4 space-y-6">
          {selectedSection === "Dashboard" && (
            <div className="space-y-6 flex flex-col gap-1">
              {/* Top Section */}
              <div className="flex justify-between items-start gap-6 max-h-46">
                <WalletCard onTopUpClick={openModal}/>
                <SendGift />
              </div>

              {/* Gift History Table */}
              <div className="mt-2">
                <GiftHistoryTable />
              </div>
            </div>
          )}

          {selectedSection === "Gifts" && <GiftsContent />}
          {selectedSection === "Moments" && <MomentsContent />}
        </main>
      </div>

      {/* Top-Up Modal */}
      {isModalOpen && <TopUpModal onClose={closeModal} />}
    </div>
  );
}
