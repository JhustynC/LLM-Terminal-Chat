import { ChatMessageEntity } from "../../domain/entities/chat-message.entiy";
import { ChatHistoryRepository } from "../../domain/repositories/chat-history.repository";


// let history = [
//   {
//     role: "user",
//     parts: [
//       {
//         text: "Hola, buen dia mi estimado",
//       },
//     ],
//   },
//   {
//     role: "model",
//     parts: [
//       {
//         text: "Hola ¿como puedo ayudarte?",
//       },
//     ],
//   },
//   {
//     role: "user",
//     parts: [
//       {
//         text: "Mi nombre es Jhustyn y necesito ayuda con un problema de programación",
//       },
//     ],
//   },
//   {
//     role: "model",
//     parts: [
//       {
//         text: "Por su puesto Juan, ¿en qué problema puedo ayudarte y que lenguaje es+?",
//       },
//     ],
//   },
// ];


export class ChatHistoryRepositoryImpl implements ChatHistoryRepository {
  private history: ChatMessageEntity[] = [];

  addMessage(message: ChatMessageEntity): void {
    this.history.push(message);
  }

  getHistory(): ChatMessageEntity[] {
    return this.history;
  }
}
