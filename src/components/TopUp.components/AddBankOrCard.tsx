import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTopUpStore } from "../../stores/topUpStore";
import dropdown from "./TopUpModal-img/drpDwn.svg";
import masterCard from "./TopUpModal-img/MasterCardSymbol.svg.svg";

const AddBankOrCard = () => {
  const {
    paymentMethod,
    setSelectedBank,
    setSelectedCard,
    addSavedBank,
    addSavedCard,
    goToPhase,
    topUpAmount,
  } = useTopUpStore();

  const [bankForm, setBankForm] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
  });

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    brand: "",
    accountName: "",
  });

  const [saveBank, setSaveBank] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { accountNumber, bankName, accountName } = bankForm;
    if (!accountNumber || !bankName || !accountName) {
      alert("Please fill all bank fields.");
      return;
    }

    const newBank = {
      id: Date.now(),
      accountNumber,
      bankName,
      accountName,
      icon: "",
    };

    setSelectedBank(newBank);
    if (saveBank) addSavedBank(newBank);
    goToPhase(4);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { cardNumber, expiry, brand, accountName } = cardForm;
    if (!cardNumber || !expiry || !brand || !accountName) {
      alert("Please fill all card fields.");
      return;
    }

    const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`;
    const newCard = {
      id: Date.now(),
      name: maskedCard,
      cardNumber: maskedCard,
      brand,
      expiryDate: expiry,
      holder: accountName,
      icon: "",
    };

    setSelectedCard(newCard);
    if (saveCard) addSavedCard(newCard);
    goToPhase(4);
  };

  const renderTopLayout = () => (
    <div className="w-full flex justify-between items-center text-xs border border-[#8EECA5] py-1.5 px-4 rounded-xs bg-green-faint mt-3">
      <p>Amount to top-up:</p>
      <p className="text-base font-bold">₦{topUpAmount?.toLocaleString()}</p>
    </div>
  );

  const fadeUpVariant = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.3 },
  };

  const renderBankForm = () => (
    <motion.form
      key="bank"
      {...fadeUpVariant}
      onSubmit={handleBankSubmit}
      className="flex flex-col gap-2 w-full mt-4"
    >
      {[
        { label: "Account Number", placeholder: "1024567359", key: "accountNumber" },
        { label: "Bank Name", placeholder: "Choose Bank", key: "bankName", isDropdown: true },
        { label: "Account Name", placeholder: "John Doe", key: "accountName" },
      ].map(({ label, placeholder, key, isDropdown }) => (
        <div key={key} className="flex flex-col text-xs gap-1.5 text-[#64748B] font-semibold">
          <label>{label}</label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="border py-3 px-4 border-gray-200 rounded-md text-[#A0ABBB] outline-none w-full text-xs font-normal"
              value={bankForm[key as keyof typeof bankForm]}
              onChange={(e) => setBankForm({ ...bankForm, [key]: e.target.value })}
              required
            />
            {isDropdown && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                <img src={dropdown} alt="dropdown" />
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-green"
          checked={saveBank}
          onChange={() => setSaveBank(!saveBank)}
        />
        <p className="text-xs text-[#64748B]">Save Bank and details</p>
      </div>

      <div className="mt-3 grid grid-cols-2 w-full gap-3 text-sm">
        <button type="button" className="button2" onClick={() => goToPhase(2)}>Back</button>
        <button type="submit" className="button1">Make Payment</button>
      </div>
    </motion.form>
  );

  const renderCardForm = () => (
    <motion.form
      key="card"
      {...fadeUpVariant}
      onSubmit={handleCardSubmit}
      className="flex flex-col gap-2 w-full mt-4"
    >
      {[
        { label: "Card Number", placeholder: "4242 4242 4242 4242", key: "cardNumber", icon: "Card" },
        { label: "Card Name", placeholder: "John Doe", key: "accountName" },
      ].map(({ label, placeholder, key, icon }) => (
        <div key={key} className="flex flex-col text-xs gap-1.5 text-[#64748B] font-semibold">
          <label>{label}</label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder={placeholder}
              className="border py-3 px-4 border-gray-200 rounded-md text-[#A0ABBB] outline-none w-full text-xs font-normal"
              value={cardForm[key as keyof typeof cardForm]}
              onChange={(e) => setCardForm({ ...cardForm, [key]: e.target.value })}
              required
            />
            {icon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                <img src={masterCard} alt="mastercard icon" />
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col text-xs gap-1.5 text-[#64748B] font-semibold">
          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="04/30"
            className="border py-3 px-4 border-gray-200 rounded-md text-[#A0ABBB] outline-none w-full text-xs font-normal"
            value={cardForm.expiry}
            onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col text-xs gap-1.5 text-[#64748B] font-semibold">
          <label>CVV</label>
          <input
            type="text"
            placeholder="123"
            className="border py-3 px-4 border-gray-200 rounded-md text-[#A0ABBB] outline-none w-full text-xs font-normal"
            value={cardForm.brand}
            onChange={(e) => setCardForm({ ...cardForm, brand: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-green"
          checked={saveCard}
          onChange={() => setSaveCard(!saveCard)}
        />
        <p className="text-xs text-[#64748B]">Save Card and details</p>
      </div>

      <div className="mt-3 grid grid-cols-2 w-full gap-3 text-sm">
        <button type="button" className="button2" onClick={() => goToPhase(2)}>Back</button>
        <button type="submit" className="button1">Make Payment</button>
      </div>
    </motion.form>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {renderTopLayout()}
      <AnimatePresence mode="wait">
        {paymentMethod === "bank" && renderBankForm()}
        {paymentMethod === "card" && renderCardForm()}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddBankOrCard;
