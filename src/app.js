const axios = require("axios");
const pc = require("picocolors");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { envs } = require("./config/plugins/envs.plugin");

const rl = readline.createInterface({ input, output });

let history = [
  {
    role: "user",
    parts: [
      {
        text: "Hola, buen dia mi estimado",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Hola ¿como puedo ayudarte?",
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "Mi nombre es Jhustyn y necesito ayuda con un problema de programación",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Por su puesto Jhustyn, ¿en qué problema puedo ayudarte y que lenguaje es+?",
      },
    ],
  },
];

async function obtainResponseFromGemini(message) {
  history.push({
    role: "user",
    parts: [{ text: message }],
  });

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${envs.GOOGLE_GEMINI_API_KEY}`,
      {
        systemInstruction: {
          parts: [
            {
              text: " Actúa como un chatbot, tus respuesta no tendran efectos de texto como usar *, en su lugar si tienes que hacer una lista enumeralos en orden con numeros, no uses efectos para las palabras, todas las respuestas que de se imprimiran en una consola, terminal o bash. Tampoco uses tildes, hacentos o caracteres especiales. que no se pueden imprimir en una terminal.No tienes permitido usar emojis.",
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
    console.error(
      pc.red("Errsor obteniendo respuesta de Gemini:"),
      error
    );
    return null;
  }
}

async function askQuestion(){
  return new Promise((resolve) => {
    rl.question(pc.cyan("message: "), (answer) => {
      resolve(answer);
    });
  });
}

function typeWriterEffect(text, delay = 100) {
  return new Promise((resolve) => {
    let i = 0;
    function printCharacter() {
      if (i < text.length) {
        process.stdout.write(pc.green(text[i])); // Imprime caracter por caracter
        i++;
        setTimeout(printCharacter, delay); // Espera antes de imprimir el siguiente
      } else {
        resolve();
      }
    }
    printCharacter();
  });
}

async function main() {
  while (true) {
    const message = await askQuestion();
    const stream = await obtainResponseFromGemini(message);

    if (!stream) {
      console.log(pc.red("No se pudo obtener la respuesta."));
      continue;
    }

    console.log(pc.green("Response:"));

    let buffer = "";
    let text = "";

    stream.on("data", (chunk) => {
      buffer += chunk.toString();
    });

    await new Promise((resolve) => {
      stream.on("end", async () => {
        try {
          const jsonArray = JSON.parse(buffer.trim());
          for (const item of jsonArray) {
            if (item.candidates && item.candidates.length > 0) {
              text = item.candidates[0].content.parts
                .map((part) => part.text)
                .join("");
              await typeWriterEffect(text, 15); // Espera hasta que termine de escribir
            }
          }
          history.push({
            role: "model",
            parts: [{ text }],
          });
        } catch (error) {
          console.error(
            pc.red("Error procesando la respuesta:"),
            error
          );
        }
        resolve(); // Permite continuar con la siguiente pregunta
      });

      stream.on("error", (err) => {
        console.error(pc.red("Error en el streaming:"), err);
        resolve();
      });
    });
  }
}

main();