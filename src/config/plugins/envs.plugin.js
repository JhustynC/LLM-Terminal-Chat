require("dotenv").config();
const env = require("env-var");

const envs = {};

try {
  envs.GOOGLE_GEMINI_API_KEY = env
    .get("GOOGLE_GEMINI_API_KEY")
    .required()
    .asString();
} catch (error) {
  console.error("Error: La variable de entorno GOOGLE_GEMINI_API no está definida.");
  process.exit(1); // Termina la ejecución si falta la variable
}

module.exports = { envs };