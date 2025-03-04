import { GeminiDatasource } from "./infrastructure/datasources/gemini.datasource";
import { ChatHistoryRepositoryImpl } from "./infrastructure/repositories/chat-history.repository.impl";
import { ObtainResponseUseCase } from "./domain/use-cases/obtain-response.usecase.ts";
import { ChatbotController } from "./presentation/chat-LLM.controller";
import { AskQuestion } from "./domain/use-cases/ask-question.usecase.ts";


const chatDatasource = new GeminiDatasource();
const chatHistoryRepo = new ChatHistoryRepositoryImpl();
const obtainResponseUseCase = new ObtainResponseUseCase(chatDatasource, chatHistoryRepo);
const chat_llm = new ChatbotController(obtainResponseUseCase);

async function main() {
  while (true) {
    const message = await AskQuestion.execute();
    await chat_llm.handleMessage(message);
  }
}

main();
