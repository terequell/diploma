import express from 'express';
import cors from 'cors';
import router from './router.js';
import dotenv from 'dotenv';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config()

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/', authMiddleware, router);

app.listen(3005, () => console.log('Server is running on port 3005'));
