import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './lib/routes/route';
import serverlessExpress from '@vendia/serverless-express';


const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.raw({ type: 'application/json' }));
app.use(express.json());

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
export default app
