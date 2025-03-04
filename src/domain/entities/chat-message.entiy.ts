export class ChatMessageEntity {
  constructor(
    public role: "user" | "model",
    public parts: { text: string }[]
  ) {}
}