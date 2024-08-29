import { app } from "./infrasctructure/config/app";
import { httpserver } from "./infrasctructure/config/app";
import connectDb from "./infrasctructure/config/db";

async function startServer(): Promise<void> {
    try {
        const port = process.env.PORT || 3000;  // Provide a default port if not set

        console.log('Starting server...');
        console.log('Node.js version:', process.version);
        console.log('Memory usage:', process.memoryUsage());

        // Connect to the database before starting the server
        console.log('Connecting to database...');
        await connectDb();
        console.log('Database connected successfully');

        app.get('/', (req, res) => {
            res.send('hello world!');
        });

        httpserver.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}

startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});