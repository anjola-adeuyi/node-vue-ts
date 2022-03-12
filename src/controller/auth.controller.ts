import { Request, Response } from "express";
import { getManager } from "typeorm";
import bcryptjs from 'bcryptjs';
import { User } from "../entity/user.entity";
import { RegisterValidation } from "../validation/register.validation";

const Register = async (req: Request, res: Response) => {
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

  const repository = getManager().getRepository(User);

  const {password, ...user} = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10)
  });

  res.send(user)
}

export default Register