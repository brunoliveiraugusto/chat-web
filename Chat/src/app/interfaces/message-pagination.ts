import { Message } from "./message";

export interface MessagePagination {
  messages: Message[];
  totalMessages: number;
}
