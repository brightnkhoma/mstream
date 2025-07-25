import express from 'express';
import cors from 'cors';
import router from './lib/routes/route';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(router);

module.exports = app;
