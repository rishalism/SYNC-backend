import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'
import projectLeadRoute from '../router/ProjectLeadRoute'
import commonRoute from '../router/CommonRoutes'
import session, { SessionOptions } from 'express-session';
import errorHandleMiddleware from '../middlewares/errorHandling';
import teamMemberRoute from '../router/TeamMemberRoutes'
import ProjectRoutes from '../router/ProjectsRoutes';

dotenv.config()
export const app = express()
export const httpserver = createServer(app)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 }))
app.use(morgan('dev'))
app.use(cookieparser());

app.use(cors({
    origin: process.env.CORS_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const sessionOptions: SessionOptions = {
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
}

app.use(session(sessionOptions))



app.use("/api/Project-Lead", projectLeadRoute)
app.use("/api/Team-Member", teamMemberRoute)
app.use("/api/Common-Routes", commonRoute)
app.use('/api/v1/projects', ProjectRoutes)
app.use(errorHandleMiddleware)

