import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './utils/db_connect.js';
import path from 'path';

import circlesRouter from './routes/circle.route.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import startSheduler from './bot/sheduler.js';

dotenv.config();
const app = express();
dbConnect().then(() => startSheduler());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('../client/build')))

app.use('/circle', circlesRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
})


export default app;
