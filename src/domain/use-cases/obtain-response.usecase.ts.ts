import { typeWriterEffect } from "../../shared/utils/typewriter.util";
import { ChatDatasource } from "../datasources/chat.datasource";
import { ChatHistoryRepository } from "../repositories/chat-history.repository";
import { Readable } from "stream";
import pc from 'picocolors';

export class ObtainResponseUseCase {
  constructor(
    private chatDatasource: ChatDatasource,
    private chatHistoryRepo: ChatHistoryRepository
  ) {}

  async execute(message: string): Promise<string> {
    const history = this.chatHistoryRepo.getHistory();
    const responseStream = await this.chatDatasource.obtainResponse(message, history);
    
    
    // Convertir el stream a un string
    const responseJson = await this.streamToString(responseStream);
    
    try {
      console.log(pc.green("Response:"));
      // Parsear el JSON y extraer la parte que interesa
      const jsonArray = JSON.parse(responseJson.trim());
      let responseText = "";

      for (const item of jsonArray) {
        if (item.candidates && item.candidates.length > 0) {
          responseText = item.candidates[0].content.parts
            .map((part: any) => part.text)
            .join(""); // Unimos los textos en caso de múltiples partes
          await typeWriterEffect(responseText, 15);
        }
      }

      // Guardar en el historial
      this.chatHistoryRepo.addMessage({ role: "model", parts: [{ text: responseText }] });

      return responseText;
    } catch (error) {
      console.error("Error procesando la respuesta:", error);
      return "Hubo un error al procesar la respuesta.";
    }
  }

  private async streamToString(stream: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = "";
      
      stream.on("data", (chunk) => {
        data += chunk.toString();
      });

      stream.on("end", () => {
        resolve(data);
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  }
}
