import { Request, Response } from "express";
import { getManager } from "typeorm";
import bcryptjs from "bcryptjs";
import { User } from "../entity/user.entity";


export const Users = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(User);

  const users = await respository.find();

  res.send(users.map(eachUser => {
    const {password, ...data} = eachUser;

    return data;
  }))
}

export const CreatUser = async (req: Request, res: Response) => {
  const {role_id, ...body} = req.body;
  const hashedPassword = await bcryptjs.hash("1234", 10);

  const repository = getManager().getRepository(User);

  const {password, ...user} = await repository.save({
    ...body,
    password: hashedPassword
  });

  res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const {password, ...user} = await repository.findOne(req.params.id);

  res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {
  const {role_id, ...body} = req.body;

  const repository = getManager().getRepository(User);

  await repository.update(req.params.id, body);

  const {password, ...user} = await repository.findOne(req.params.id);

  res.status(202).send(user);
}

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  await repository.delete(req.params.id);

  res.status(204).send(null);
}