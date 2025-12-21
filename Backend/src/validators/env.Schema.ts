import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z
        .string()
        .default("3000")
        .transform((val) => parseInt(val, 10)),
    MONGO_URI: z.string(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRY: z.string().default("1d"),
    PERPLEXITY_API_KEY: z.string()
});

export type EnvConfig = z.infer<typeof envSchema>;
