import express from 'express';
import cors from 'cors';
import dbConnect from './utils/db_connect.js';

import circlesRouter from './routes/circle.route.js';

const app = express();
dbConnect();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(circlesRouter);


export default app;
