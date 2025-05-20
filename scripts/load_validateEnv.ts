import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envPath = ".env";
const templatePath = ".env.template";

// Load actual .env values
dotenv.config({ path: envPath });

//Load template, but **do ont overwrite already set vars**
const templateVars = dotenv.parse(fs.readFileSync(templatePath));
for (const key in templateVars) {
  if (!process.env[key]) {
    process.env[key] = templateVars[key];
  }
}

function validateEnv(requiredVars: string[]) {
  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
}

validateEnv(["LOGIN_USER", "LOGIN_PASS", "BASE_URL"]);
