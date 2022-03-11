import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"]
}));

app.get('/', (req: Request, res: Response)=> {
  res.send("Hello World")
});

const port = 8000;

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})