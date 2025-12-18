import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";
import { ENV } from "./env.js";

class Database {
    private static instance: Database;
    private connection: any = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (this.connection) {
            console.log(`USING EXISTING CONNECTION...`);
            return;
        }

        try {
            const connectionInstance = await mongoose.connect(
                `${ENV.MONGO_URI}/${DB_NAME}`
            );
            this.connection = connectionInstance.connection;
            console.log(
                `🍃MONGODB CONNECTED SUCCESSFULLY !! DB_HOST: ${this.connection.host}`
            );

            this.setupEventListeners();
        } catch (error) {
            console.error(`MONGODB CONNECTION ERROR: `, error);
            process.exit(1);
        }
    }

    private setupEventListeners(): void {
        mongoose.connection.on("error", (error) => {
            console.error(`DATABASE CONNECTION ERROR: `, error);
        });

        mongoose.connection.on("disconnected", () => {
            console.error(`DATABASE DISCONNECTED`);
        });
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
            console.log(`DATABASE CONNECTION CLOSED`);
        }
    }
}

export const databaseConnection = Database.getInstance();
