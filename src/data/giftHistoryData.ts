import type { GiftHistoryItem } from "../types/types";
import avatar1 from "./GiftHistory-img/people-avatar-1.svg"
import avatar2 from "./GiftHistory-img/people-avatar.svg"
import avatar3 from "./GiftHistory-img/people-avatar-2.svg"

export const giftHistory: GiftHistoryItem[] = [
  {
    id: 1,
    receiver: {
      name: "Bolaji Oluwaseyi",
      type: "Contact",
      avatar: avatar1,
    },
    giftName: "Outfit Voucher",
    tags: ["Fashion"],
    dateSent: "2025-04-14",
    status: "Completed",
  },
  {
    id: 2,
    receiver: {
      name: "Ranhmat Shittu",
      type: "Random",
      avatar: avatar2,
    },
    giftName: "Grocery Pack",
    tags: ["Food"],
    dateSent: "2025-04-11",
    status: "Completed",
  },
  {
    id: 3,
    receiver: {
      name: "Mummy Mary",
      type: "Contact",
      avatar: avatar3,
    },
    giftName: "Spa Essentials",
    tags: ["Health"],
    dateSent: "2025-04-07",
    status: "Sending",
  },
  {
    id: 4,
    receiver: {
      name: "Elizabeth Adeniran",
      type: "Contact",
      avatar: avatar2,
    },
    giftName: "Welfare Box",
    tags: ["Food", "Fashion"],
    dateSent: "2025-04-02",
    status: "Completed",
  },
  {
    id: 5,
    receiver: {
      name: "Stephen Okeh",
      type: "random",
      avatar: avatar3,
    },
    giftName: "School Box",
    tags: ["Food", "Books"],
    dateSent: "2025-06-02",
    status: "pending",
  },
];
