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

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });

// ✅ Instead, export the handler
export const handler = serverlessExpress({ app });
