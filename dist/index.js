"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrasctructure/config/app");
const app_2 = require("./infrasctructure/config/app");
const db_1 = __importDefault(require("./infrasctructure/config/db"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const port = process.env.PORT || 3000; // Provide a default port if not set
            console.log('Starting server...');
            console.log('Node.js version:', process.version);
            console.log('Memory usage:', process.memoryUsage());
            // Connect to the database before starting the server
            console.log('Connecting to database...');
            yield (0, db_1.default)();
            console.log('Database connected successfully');
            app_1.app.get('/', (req, res) => {
                res.send('hello world!');
            });
            app_2.httpserver.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
        catch (error) {
            console.error('Failed to start the server:', error);
            process.exit(1);
        }
    });
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
