import { cleanEnv, host, port, str } from "envalid";
import "dotenv/config";

export const ENV = cleanEnv(process.env, {
    DATABASE_URL: str(),
    JWT_ACCESS_SECRET: str(),
    JWT_REFRESH_SECRET: str(),
})