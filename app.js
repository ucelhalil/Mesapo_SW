import express from 'express';
import dotenv from 'dotenv';
import ErrorHandler from './src/middleware/error_handler.js';
import WelcomeRouter from './src/router/welcome.js';

const app = express();
dotenv.config();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(ErrorHandler);

app.use(WelcomeRouter);

export default app;