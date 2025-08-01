import React, { useState } from "react";
import { useTopUpStore } from "../../stores/topUpStore";
import Naira from "./TopUpModal-img/₦.svg"

const SelectAmount = () => {
  const presetAmounts = [1000, 5000, 10000, 25000];

  const [amount, setAmount] = useState<number>(10000); // default ₦10,000
  const [inputAmount, setInputAmount] = useState<string>("10,000");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(10000);

  const { setTopUpAmount, goToPhase } = useTopUpStore();

  const formatAmount = (val: number | string) => {
    const num = Number(val.toString().replace(/,/g, ""));
    return isNaN(num) ? "" : num.toLocaleString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "").replace(/[^0-9]/g, "");
    const formatted = formatAmount(raw);
    setInputAmount(formatted);
    setAmount(Number(raw));
    setSelectedPreset(null); // clear preset if manually entering
  };

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setInputAmount(val.toLocaleString());
    setSelectedPreset(val);
  };

  const handleContinue = () => {
    if (amount > 0) {
      setTopUpAmount(amount);
      goToPhase(2);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <p className="text-xs mb-2.5 text-textgray">Enter amount</p>

        <div className="mb-6 w-full max-w-[70%] h-20">
          <div className="w-full h-full flex text-4xl font-semibold items-center justify-center">
            <span className="mr-1"><img src={Naira} alt="Naira Icon" className="h-13 w-12" /></span>
            <input
              type="text"
              aria-label="type your amount here"
              inputMode="numeric"
              className="bg-transparent text-6xl outline-none text-center w-60 h-full"
              value={inputAmount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="w-[85%] flex flex-col justify-center items-center mt-6">
          <div className="w-full grid grid-cols-4 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetClick(amt)}
                className={`border rounded p-2 font-medium transition-colors ${
                  selectedPreset === amt
                    ? "border-[#19BD42] bg-[#E8FBED] text-black"
                    : "border-[#D0D5DD] text-[#64748B] hover:border-[#19BD42]"
                }`}
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs mt-4 text-center text-[#64748B]">
          This is the amount that will be added to your gifting wallet.
        </p>
      </div>

      

      <button
        onClick={handleContinue}
        className={`w-full py-3.5 rounded-lg text-[#E8FBED] text-sm font-semibold mt-11 text-center ${
          amount > 0 ? "bg-[#19BD42] hover:bg-[#17a63b]" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!amount || amount <= 0}
      >
        Continue
      </button>
    </div>
  );
};

export default SelectAmount;
