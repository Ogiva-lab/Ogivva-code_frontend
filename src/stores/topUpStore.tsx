import { create } from "zustand";

export type PaymentMethod = "bank" | "transfer" | "card" | null;

export interface BankDetails {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  icon: string; // Path or URL to bank icon
}

export interface CardDetails {
  id: number;
  name: string;
  brand: string;
  icon: string; // Path or URL to card icon
  cardNumber: string;
  holder: string;
  expiryDate: string; // Format: MM/YY
}

interface TopUpStore {
  // UI state
  isModalOpen: boolean;
  currentPhase: 1 | 2 | 3 | 4;

  // Payment state
  topUpAmount: number | null;
  paymentMethod: PaymentMethod;

  // Selected options
  selectedBank?: BankDetails;
  selectedCard?: CardDetails;

  // Saved payment methods
  savedBanks: BankDetails[];
  savedCards: CardDetails[];

  // Wallet balance
  walletBalance: number;
  addToWallet: (amount: number) => void;

  // Add new saved payment methods
  addSavedBank: (bank: BankDetails) => void;
  addSavedCard: (card: CardDetails) => void;

  // Track if user is adding new payment
  isAddingNewPayment: boolean;

  // Timer for transfer page
  timeLeft: number;
  setTimeLeft: (seconds: number) => void;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  goToPhase: (phase: 1 | 2 | 3 | 4) => void;

  setTopUpAmount: (amount: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setSelectedBank: (bank: BankDetails) => void;
  setSelectedCard: (card: CardDetails) => void;
  setIsAddingNewPayment: (value: boolean) => void;

  resetState: () => void;
}

export const useTopUpStore = create<TopUpStore>((set) => ({
  // Initial state
  isModalOpen: false,
  currentPhase: 1,

  topUpAmount: null,
  paymentMethod: null,

  selectedBank: undefined,
  selectedCard: undefined,

  savedBanks: [],
  savedCards: [],

  walletBalance: 0, // Initial balance
  addToWallet: (amount) =>
    set((state) => ({
      walletBalance: state.walletBalance + amount,
    })),

  isAddingNewPayment: false,

  timeLeft: 35 * 60, // 35 minutes in seconds

  // Modal handlers
  openModal: () =>
    set({
      isModalOpen: true,
      currentPhase: 1,
      timeLeft: 35 * 60,
    }),

  closeModal: () =>
    set((state) => {
      state.resetState();
      return { isModalOpen: false };
    }),

  // Navigation
  goToPhase: (phase) => set({ currentPhase: phase }),

  // Input setters
  setTopUpAmount: (amount) => set({ topUpAmount: amount }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setSelectedBank: (bank) => set({ selectedBank: bank }),
  setSelectedCard: (card) => set({ selectedCard: card }),
  setIsAddingNewPayment: (value) => set({ isAddingNewPayment: value }),

  // Timer
  setTimeLeft: (seconds) => set({ timeLeft: seconds }),

  // Save bank/card
  addSavedBank: (bank) =>
    set((state) => ({
      savedBanks: [...state.savedBanks, bank],
    })),

  addSavedCard: (card) =>
    set((state) => ({
      savedCards: [...state.savedCards, card],
    })),

  // Reset state (do not reset walletBalance)
  resetState: () =>
    set((state) => ({
      ...state,
      currentPhase: 1,
      topUpAmount: null,
      paymentMethod: null,
      selectedBank: undefined,
      selectedCard: undefined,
      savedBanks: [],
      savedCards: [],
      isAddingNewPayment: false,
      timeLeft: 35 * 60,
    })),
}));
