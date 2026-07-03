import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { ENV } from "../config/env";
import { PrismaClient } from "../generated/client";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const client = new PrismaClient({
  adapter,
});