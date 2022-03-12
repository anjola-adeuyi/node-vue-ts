import { Request, Response } from "express";
import { getManager } from "typeorm";
import bcryptjs from 'bcryptjs';
import { User } from "../entity/user.entity";
import { RegisterValidation } from "../validation/register.validation";

export const Register = async (req: Request, res: Response) => {
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

export const Login = async (req: Request, res: Response) => {
  const { body } = req;

  const repository = getManager().getRepository(User);

  const user = await repository.findOne({email: body.email})

  if (!user) {
    return res.status(404).send({
      // message: "user not found"
      messsage: "invalid credentials"
    })
  }

  if (!await bcryptjs.compare(body.password, user.password)) {
    return res.status(400).send({
      messsage: "invalid credentials"
    })
  }

  const {password, ...data} = user;

  res.send(data);
}
