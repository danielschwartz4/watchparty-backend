import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User, { UserModel } from "../models/User";

const createUser = (req: Request, res: Response, _: NextFunction) => {
  const { name, sessionId }: UserModel = req.body;
  const user = new User({
    id: new mongoose.Types.ObjectId(),
    name,
    sessionId,
  });
  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, _: NextFunction) => {
  const userId = req.params.userId;
  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllUser = (_: Request, res: Response, __: NextFunction) => {
  return User.find()
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

const updateUser = (req: Request, res: Response, _: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, _: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ user, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  readUser,
  readAllUser,
  updateUser,
  deleteUser,
};
