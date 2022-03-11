import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";

const Register = (req: Request, res: Response) => {
  const { body } = req;

  const {error} = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body && body.password !== body.password_confirm) {
    res.status(400).send({
      message: "passwords do not match"
    })
  }

  res.send(body)
}

export default Register