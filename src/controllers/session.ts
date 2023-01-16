import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Session, { SessionModel } from "../models/Session";

const createSession = (req: Request, res: Response, _: NextFunction) => {
  const { elapsedTime, startVideoUrl }: SessionModel = req.body;
  const session = new Session({
    id: new mongoose.Types.ObjectId(),
    elapsedTime,
    startVideoUrl,
  });
  return session
    .save()
    .then((session) => res.status(201).json({ session }))
    .catch((error) => res.status(500).json({ error }));
};

const readSession = (req: Request, res: Response, _: NextFunction) => {
  const sessionId = req.params.sessionId;
  return Session.findById(sessionId)
    .then((session) =>
      session
        ? res.status(200).json({ session })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllSession = (_: Request, res: Response, __: NextFunction) => {
  return Session.find()
    .then((session) => {
      res.status(200).json({ session });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

const updateSession = (req: Request, res: Response, _: NextFunction) => {
  const sessionId = req.params.sessionId;

  return Session.findById(sessionId)
    .then((session) => {
      if (session) {
        session.set(req.body);
        return session
          .save()
          .then((session) => res.status(201).json({ session }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteSession = (req: Request, res: Response, _: NextFunction) => {
  const sessionId = req.params.sessionId;

  return Session.findByIdAndDelete(sessionId)
    .then((session) =>
      session
        ? res.status(201).json({ session, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createSession,
  readSession,
  readAllSession,
  updateSession,
  deleteSession,
};
