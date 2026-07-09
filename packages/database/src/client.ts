import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@repo/config";
import { Pool } from "pg";
import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({
	connectionString: config.backend.databaseUrl,
});
export const adapter = new PrismaPg(pool);

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
		log: ["query", "info", "warn", "error"],
	});

if (config.nodeEnv !== "production") globalForPrisma.prisma = prisma;

export * from "../generated/client";
