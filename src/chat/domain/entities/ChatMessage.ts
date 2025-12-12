export class ChatMessage {
  constructor(
    public userId: string,
    public question: string,
    public answer: string,
    public tokens: number,
    public createdAt: Date = new Date(),
  ) {}
}
