export interface Receiver {
  name: string;
  type: string;
  avatar: string;
}

export interface GiftHistoryItem {
  id: number;
  receiver: Receiver;
  giftName: string;
  tags: string[];
  dateSent: string;
  status: "Completed" | "Sending" | string;
}
