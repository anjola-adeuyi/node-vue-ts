require('dotenv').config();

import express, { Request, Response } from 'express'
import cors from 'cors'
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

createConnection().then( connection => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  }));
  
  routes(app);
  
  const port = 8000;
  
  app.listen(port, () => {
    console.log(`listening to port ${port}`)
  })
})
