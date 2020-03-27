import { config } from "dotenv";
config();

export default function env(key: string) {
  return process.env[key];
}
