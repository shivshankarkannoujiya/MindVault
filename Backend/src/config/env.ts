import dotenv from "dotenv";
import { envSchema } from "../validators/env.Schema.js";

dotenv.config({
    path: "./.env",
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(`🤭Invalid environment varibale`);
    process.exit(1);
}

export const ENV = _env.data;
