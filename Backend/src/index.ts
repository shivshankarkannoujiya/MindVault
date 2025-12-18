import app from "./app.js";
import { ENV } from "./config/env.js";
import { databaseConnection } from "./config/index.js";

const startServer = async () => {
    try {
        await databaseConnection.connect();

        const server = app.listen(ENV.PORT, () => {
            console.log(
                `🐰Server is listening at:http://localhost:${ENV.PORT}`
            );
        });

        const shutdown = async (signal: string) => {
            console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

            server.close(async () => {
                console.log(`🐰HTTP SERVER CLOSE`);
                await databaseConnection.disconnect();
                console.log(`🔥SHUTDOWN COMPLETED`);
                process.exit(0);
            });

            setTimeout(() => {
                console.error(
                    `⚙️Could not close connections in time, forcefully shutting down`
                );
                process.exit(1);
            }, 10000);
        };

        process.on(`SIGINT`, () => shutdown(`SIGINT`));
        process.on(`SIGTERM`, () => shutdown(`SIGTERM`));
    } catch (error) {
        console.error(`🤭Failed to start server:`, error);
        process.exit(1);
    }
};

startServer();
