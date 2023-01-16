import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Event, { EventModel } from "../models/Event";

const createEvent = (req: Request, res: Response, _: NextFunction) => {
  const {
    userId,
    sessionId,
    type,
    sessionIncrement,
    timeStamp,
    globalTimeStamp,
    seekToTimeStamp,
    pauseTimeElapsed,
    newVideoUrl,
  }: EventModel = req.body;
  const event = new Event({
    id: new mongoose.Types.ObjectId(),
    userId,
    sessionId,
    type,
    sessionIncrement,
    timeStamp,
    globalTimeStamp,
    seekToTimeStamp,
    pauseTimeElapsed,
    newVideoUrl,
  });
  return event
    .save()
    .then((event) => res.status(201).json({ event }))
    .catch((error) => res.status(500).json({ error }));
};

const readEventById = (req: Request, res: Response, _: NextFunction) => {
  const eventId = req.params.eventId;
  return Event.findById(eventId)
    .then((event) =>
      event
        ? res.status(200).json({ event })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readEventBySessionId = (req: Request, res: Response, _: NextFunction) => {
  const sessionId = req.params.sessionId;
  return Event.find({ sessionId: sessionId })
    .sort({ globalTimeStamp: 1 })
    .then((event) =>
      event
        ? res.status(200).json({ event })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllEvent = (_: Request, res: Response, __: NextFunction) => {
  return Event.find()
    .then((event) => {
      res.status(200).json({ event });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

const updateEvent = (req: Request, res: Response, _: NextFunction) => {
  const eventId = req.params.eventId;

  return Event.findById(eventId)
    .then((event) => {
      if (event) {
        event.set(req.body);
        return event
          .save()
          .then((event) => res.status(201).json({ event }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteEvent = (req: Request, res: Response, _: NextFunction) => {
  const eventId = req.params.eventId;

  return Event.findByIdAndDelete(eventId)
    .then((event) =>
      event
        ? res.status(201).json({ event, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createEvent,
  readEventById,
  readEventBySessionId,
  readAllEvent,
  updateEvent,
  deleteEvent,
};
