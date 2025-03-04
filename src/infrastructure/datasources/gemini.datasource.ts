import axios from "axios";
import { ChatMessageEntity } from "../../domain/entities/chat-message.entiy";
import { ChatDatasource } from "../../domain/datasources/chat.datasource";
import { envs } from "../../config/plugins/envs.plugin";
import { Readable } from "stream";  // Importar Readable para definir el tipo de retorno

export class GeminiDatasource implements ChatDatasource {
  
  // Implementación de la función de la abstracción 
  async obtainResponse(message: string, history: ChatMessageEntity[]): Promise<Readable> {
    history.push(new ChatMessageEntity("user", [{ text: message }]));

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${envs.GOOGLE_GEMINI_API_KEY}`,
        {
          systemInstruction: {
            parts: [
              {
                text: "Actua como un caballero conocerdor de muchas cosas, educado y alagador",
              },
            ],
          },
          contents: history,
        },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "stream", // Activar el modo de transmisión
        }
      );
  
      return response.data; // Devolvemos el flujo de datos (stream)
    } catch (error) {
      console.error(`Error al intentar conseguir una respuestas de Gemini: ${error}`);
      throw new Error("Error en la respuesta"); // Lanzar error en vez de devolver string
    }
  }
}

