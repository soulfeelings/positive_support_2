import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './utils/db_connect.js';

import circlesRouter from './routes/circle.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';

dotenv.config();
const app = express();
dbConnect();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/circle', circlesRouter);
app.use('/user', authRouter);
app.use('/admin', adminRouter)


export default app;
