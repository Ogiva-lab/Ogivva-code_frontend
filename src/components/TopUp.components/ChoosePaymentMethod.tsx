import { useState, useEffect } from "react";
import { useTopUpStore } from "../../stores/topUpStore";
import Kuda from "./TopUpModal-img/kuda.svg";
import GtBank from "./TopUpModal-img/GT.svg";
import addIcon from "./TopUpModal-img/Left Icon.svg";
import CopyIcon from "./TopUpModal-img/copy.svg";
import { AnimatePresence, motion } from "framer-motion";

const savedBanks = [
  {
    id: 1,
    bankName: "Kuda Bank",
    accountNumber: "0222488418",
    accountName: "Habeebah Owojori",
    icon: Kuda,
  },
];

const savedCards = [
  {
    id: 1,
    name: "GtBank",
    brand: "Visa",
    icon: GtBank,
    cardNumber: "***-9968",
    holder: "Habeebah Owojori",
    expiryDate: "12/31",
  },
];

const ChoosePaymentMethod = () => {
  const [paymentPhase, setPaymentPhase] = useState<"card" | "bank" | "transfer">("bank");
  const [timeLeft, setTimeLeft] = useState(35 * 60); // 35 minutes in seconds

  const {
    topUpAmount,
    setPaymentMethod,
    goToPhase,
    setIsAddingNewPayment,
    setSelectedBank,
    setSelectedCard,
  } = useTopUpStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          goToPhase(1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`Copied: ${text}`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderPhase = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentPhase}
          initial={{ opacity: 0, y: 50 }}   // Start slightly lower
          animate={{ opacity: 1, y: 0 }}    // Animate to normal position
          exit={{ opacity: 0, y: 30 }}      // Exit downward
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {paymentPhase === "card" && (
            <div className="mt-9">
              {savedCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setPaymentMethod("card");
                    setSelectedCard(card);
                    goToPhase(4);
                  }}
                  className="flex justify-between items-center w-full py-6 px-4 border border-borderbg rounded-lg mt-4 hover:bg-[#F9FEFA]"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={card.icon}
                      className="h-11 w-11 rounded-full border-0.5 border-borderbg"
                      alt=""
                    />
                    <p className="text-sm">
                      {card.name} ({card.brand})
                    </p>
                  </div>
                  <p className="text-xs">{card.cardNumber}</p>
                </button>
              ))}

              <button
                onClick={() => {
                  setPaymentMethod("card");
                  setIsAddingNewPayment(true);
                  goToPhase(3);
                }}
                className="w-full flex justify-center items-center gap-1 border border-borderbg rounded-lg py-2 mt-3 font-semibold"
              >
                <img src={addIcon} alt="add icon" className="h-4 w-4" />
                <p className="text-xs">Add Card</p>
              </button>

              <button className="mt-9 w-full button2" onClick={() => goToPhase(1)}>
                Back
              </button>
            </div>
          )}

          {paymentPhase === "bank" && (
            <div className="mt-9">
              {savedBanks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => {
                    setPaymentMethod("bank");
                    setSelectedBank(bank);
                    goToPhase(4);
                  }}
                  className="flex justify-between items-center w-full py-6 px-4 border border-borderbg rounded-lg mt-4 hover:bg-[#F9FEFA]"
                >
                  <div className="flex items-center gap-2">
                    <img src={bank.icon} className="h-11 w-11 rounded-full border-0.5 border-borderbg" alt="" />
                    <p className="text-sm">{bank.bankName}</p>
                  </div>
                  <p className="text-xs">
                    {bank.accountNumber} - {bank.accountName}
                  </p>
                </button>
              ))}

              <button
                onClick={() => {
                  setPaymentMethod("bank");
                  setIsAddingNewPayment(true);
                  goToPhase(3);
                }}
                className="w-full flex justify-center items-center gap-1 border border-borderbg rounded-lg py-2 mt-3 font-semibold"
              >
                <img src={addIcon} alt="add icon" className="h-4 w-4" />
                <p className="text-xs">Add Bank</p>
              </button>

              <button className="mt-9 w-full button2" onClick={() => goToPhase(1)}>
                Back
              </button>
            </div>
          )}

          {paymentPhase === "transfer" && (
            <div className="mt-6">
              <div className="w-full text-green font-semibold text-3xl mt-3.5 text-center">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>

              <div className="w-full flex flex-col gap-2 mt-7 text-xs">
                {[
                  { label: "Bank", value: "Guaranty Trust Bank" },
                  { label: "Account Number", value: "3125788930" },
                  { label: "Account Name", value: "Ogiva-HabeebahOwojori" },
                ].map(({ label, value }) => (
                  <div key={label} className="w-full flex justify-between items-center">
                    <p className="text-[#64748B]">{label}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{value}</p>
                      {label !== "Account Name" && (
                        <img
                          src={CopyIcon}
                          alt="Copy icon"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => handleCopy(value)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-2 w-full gap-3">
                <button className="button2" onClick={() => goToPhase(1)}>
                  Back
                </button>
                <button
                  className="button1"
                  onClick={() => {
                    setPaymentMethod("transfer");
                    goToPhase(4);
                  }}
                >
                  I Have Paid
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center text-xs border border-[#8EECA5] py-1.5 px-4 rounded-xs bg-green-faint mt-3">
        <p>Amount to top-up:</p>
        <p className="text-base font-bold">₦{topUpAmount?.toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-3 text-sm w-full mt-2 gap-2 font-semibold">
        {[
          { label: "Card Payment", value: "card" },
          { label: "Bank Account", value: "bank" },
          { label: "Bank Transfer", value: "transfer" },
        ].map((btn) => (
          <button
            key={btn.value}
            className={`button3 ${paymentPhase === btn.value ? "border-[#19BD42] bg-[#E8FBED] text-black" : ""}`}
            onClick={() => setPaymentPhase(btn.value as "card" | "bank" | "transfer")}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="mt-4">{renderPhase()}</div>
    </div>
  );
};

export default ChoosePaymentMethod;
