// WalletCard.tsx
import { useTopUpStore } from "../stores/topUpStore";
import DollarFrame from "./WallectCard-img/Dollar-frame.svg";
import BackgroundLines from "./WallectCard-img/Group-line.svg";
import ButtonAddicon from "./WallectCard-img/add.svg";

interface WalletCardProps {
  onTopUpClick: () => void;
}

export default function WalletCard({ onTopUpClick }: WalletCardProps) {
  const { walletBalance } = useTopUpStore();

  return (
    <div className="h-45 relative flex items-center justify-between bg-[#062B0F] rounded-lg p-6 overflow-hidden w-[74%]">
      {/* Background Lines */}
      <img
        src={BackgroundLines}
        alt="Background decoration"
        className="absolute right-0 bottom-0 w-auto h-auto z-0"
      />

      {/* Left: Icon */}
      <img src={DollarFrame} alt="Dollar Icon" className="w-20 h-20" />

      {/* Middle: Balance */}
      <div className="ml-4 flex-1 z-10">
        <div className="text-white text-lg font-medium mt-2">Wallet Balance</div>
        <div className="text-3xl font-bold text-white mt-4">
          ₦{walletBalance.toLocaleString()}
        </div>
        <div className="flex justify-between items-end">
          <div className="text-gray-400 text-xs">
            <p className="">Every naira here can brighten someone’s day.</p>
          </div>

          <button
            onClick={onTopUpClick}
            className="flex items-center gap-2 bg-[#19BD42] hover:bg-[#17a63b] text-white font-medium text-sm px-6 py-2.5 rounded-md z-10"
          >
            <img src={ButtonAddicon} alt="Add" className="w-4 h-4" />
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
}
