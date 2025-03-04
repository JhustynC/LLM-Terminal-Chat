require("dotenv").config();
import env from "env-var";

export const envs = {
  GOOGLE_GEMINI_API_KEY :  env.get("GOOGLE_GEMINI_API_KEY").required().asString(),
};



