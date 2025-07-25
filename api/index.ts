import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './lib/routes/route';
import serverlessExpress from '@vendia/serverless-express';

const app = express();

app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});


export default serverlessExpress({ app });
