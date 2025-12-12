import { ChatRepository } from "../repositories/ChatRepository";
import { ChatMessage } from "../domain/entities/ChatMessage";
import { sleep } from "../../shared/utils/helper";

export class ChatService {
  constructor(private repo = new ChatRepository()) {}

  async askQuestion(userId: string, question: string) {
    await sleep(1500);

    const answer = `Mocked AI response: ${question}`;
    const tokens = Math.floor(Math.random() * 100) + 10;

    const chatMessage = new ChatMessage(userId, question, answer, tokens);

    return this.repo.create(chatMessage);
  }
}
