import { Readable } from "stream";
import { ChatMessageEntity } from "../entities/chat-message.entiy";

export interface ChatDatasource {
  obtainResponse(message: string, history: ChatMessageEntity[]): Promise<Readable>;
}