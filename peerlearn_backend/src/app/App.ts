import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { Project_Routes } from './routes';
import Route_Not_Found_Error from './errors/not_found';
import Global_Error_Handler from './errors/global_error';
import cookieParser from 'cookie-parser'

const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Application Routes
app.use('/app/v1', Project_Routes);

// Initial Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Server is up and running",
    })
})

// Handle Not Found Routes
app.use(Route_Not_Found_Error);

// Global Error Handler
app.use(Global_Error_Handler);


export default app;