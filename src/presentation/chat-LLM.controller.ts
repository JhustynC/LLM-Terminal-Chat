import { ObtainResponseUseCase } from "../domain/use-cases/obtain-response.usecase.ts.js";


export class ChatbotController {
  constructor(private obtainResponseUseCase: ObtainResponseUseCase) {}

  async handleMessage(message: string) {
    return await this.obtainResponseUseCase.execute(message);
  }
}
