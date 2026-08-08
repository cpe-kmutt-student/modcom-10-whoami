import { config } from "@repo/config";
import { Redis, RedisOptions } from "ioredis";

const redisOptions: RedisOptions = {
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
	db: 0,
};

const globalForRedis = global as unknown as { redis: Redis };

export const redisClient = globalForRedis.redis || new Redis(config.backend.redis.connectionUrl, redisOptions);

if (config.nodeEnv !== "production") {
	globalForRedis.redis = redisClient;
}

redisClient.on("connect", () => {
	console.log("[Redis] connected");
});

redisClient.on("ready", () => {
	console.log("[Redis] ready");
});

redisClient.on("error", (err: Error) => {
	console.error("[Redis] error:", err);
});

redisClient.on("close", () => {
	console.log("[Redis] connection closed");
});

redisClient.on("reconnecting", (delay: any) => {
	console.log(`[Redis] reconnecting in ${delay}ms`);
});

redisClient.on("end", () => {
	console.log("[Redis] connection ended");
});
