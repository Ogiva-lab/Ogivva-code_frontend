import Gift from "./SendGift-img/gift.svg"
import GiftBox from "./SendGift-img/gift-box.svg"

export default function SendGift() {
  return (
    <div className="h-45 relative py-2 px-4 rounded-xl bg-soft-green-gradient overflow-hidden flex flex-col justify-between">
      {/* Text */}
      <h1 className="relative z-10 w-[20ch] text-base font-semibold leading-[24px] text-[#36334B] mx-auto">
        Got someone in mind — or <br />
        want to surprise <br />
        a stranger?
      </h1>

      {/* Button */}
      <button
        className="relative z-10 mt-13 flex items-center justify-center gap-2 w-full mx-auto py-2.5 bg-[#19BD42] text-[#E8FBED] font-medium text-sm rounded-lg"
      >
        <img src={Gift} alt="Gift Icon" className="w-4 h-4" />
        <span className="text-sm">Send a Gift</span>
      </button>

      {/* Gift Image */}
      <img
        src={GiftBox}
        alt="gift box"
        className="absolute right-3 bottom-1 w-30 h-37 z-0"
      />
    </div>
  )
}