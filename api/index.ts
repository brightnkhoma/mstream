import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './lib/routes/route';


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.raw({ type: 'application/json' }));
app.use(express.json());

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
