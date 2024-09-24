"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpserver = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const ProjectLeadRoute_1 = __importDefault(require("../router/ProjectLeadRoute"));
const CommonRoutes_1 = __importDefault(require("../router/CommonRoutes"));
const express_session_1 = __importDefault(require("express-session"));
const errorHandling_1 = __importDefault(require("../middlewares/errorHandling"));
const TeamMemberRoutes_1 = __importDefault(require("../router/TeamMemberRoutes"));
const ProjectsRoutes_1 = __importDefault(require("../router/ProjectsRoutes"));
const ApiToolRoutes_1 = __importDefault(require("../router/ApiToolRoutes"));
const CardRouter_1 = __importDefault(require("../router/CardRouter"));
const NotePadRouter_1 = __importDefault(require("../router/NotePadRouter"));
const socket_1 = __importDefault(require("./socket"));
const ChatRouter_1 = __importDefault(require("../router/ChatRouter"));
const NotificationRoutes_1 = __importDefault(require("../router/NotificationRoutes"));
const DbDesignRouter_1 = __importDefault(require("../router/DbDesignRouter"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.httpserver = (0, http_1.createServer)(exports.app);
exports.app.use(express_1.default.json({ limit: '50mb' }));
exports.app.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 }));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: process.env.CORS_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const sessionOptions = {
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
};
exports.app.use((0, express_session_1.default)(sessionOptions));
(0, socket_1.default)(exports.httpserver);
exports.app.use("/api/Project-Lead", ProjectLeadRoute_1.default);
exports.app.use("/api/Team-Member", TeamMemberRoutes_1.default);
exports.app.use("/api/Common-Routes", CommonRoutes_1.default);
exports.app.use('/api/v1/projects', ProjectsRoutes_1.default);
exports.app.use('/api/v2/api-testing', ApiToolRoutes_1.default);
exports.app.use('/api/v3/cards', CardRouter_1.default);
exports.app.use('/api/notePad', NotePadRouter_1.default);
exports.app.use('/api/chats', ChatRouter_1.default);
exports.app.use('/api/notifications', NotificationRoutes_1.default);
exports.app.use('/api/dbDesigns', DbDesignRouter_1.default);
exports.app.use(errorHandling_1.default);
