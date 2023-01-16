"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Event_1 = __importDefault(require("../models/Event"));
const createEvent = (req, res, _) => {
    const { userId, sessionId, type, sessionIncrement, timeStamp, seekToTimeStamp, pauseTimeElapsed, newVideoUrl, } = req.body;
    const event = new Event_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        userId,
        sessionId,
        type,
        sessionIncrement,
        timeStamp,
        seekToTimeStamp,
        pauseTimeElapsed,
        newVideoUrl,
    });
    return event
        .save()
        .then((event) => res.status(201).json({ event }))
        .catch((error) => res.status(500).json({ error }));
};
const readEventById = (req, res, _) => {
    const eventId = req.params.eventId;
    return Event_1.default.findById(eventId)
        .then((event) => event
        ? res.status(200).json({ event })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readEventBySessionId = (req, res, _) => {
    const sessionId = req.params.sessionId;
    return Event_1.default.findById(sessionId)
        .then((event) => event
        ? res.status(200).json({ event })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllEvent = (_, res, __) => {
    return Event_1.default.find()
        .then((event) => {
        res.status(200).json({ event });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
    });
};
const updateEvent = (req, res, _) => {
    const eventId = req.params.eventId;
    return Event_1.default.findById(eventId)
        .then((event) => {
        if (event) {
            event.set(req.body);
            return event
                .save()
                .then((event) => res.status(201).json({ event }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteEvent = (req, res, _) => {
    const eventId = req.params.eventId;
    return Event_1.default.findByIdAndDelete(eventId)
        .then((event) => event
        ? res.status(201).json({ event, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createEvent,
    readEventById,
    readEventBySessionId,
    readAllEvent,
    updateEvent,
    deleteEvent,
};
//# sourceMappingURL=event.js.map