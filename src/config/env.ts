import { cleanEnv, host, port, str } from "envalid";
import "dotenv/config";

export const ENV = cleanEnv(process.env, {
    DATABASE_URL: str(),
    JWT_SECRET: str()
})