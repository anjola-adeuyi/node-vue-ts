import { Request, Response } from "express";

const Register = (req: Request, res: Response) => {
  res.send(req.body)
}

export default Register