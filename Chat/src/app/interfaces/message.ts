export interface Message {
  messageSent: string;
  sendDate: Date;
  sender: string;
  recipient: string;
  isRecipient?: boolean;
}
