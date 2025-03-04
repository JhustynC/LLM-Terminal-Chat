import { ChatMessageEntity } from "../entities/chat-message.entiy";

export interface ChatHistoryRepository {
  addMessage(message: ChatMessageEntity): void;
  getHistory(): ChatMessageEntity[];
}
