"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Session_1 = __importDefault(require("../models/Session"));
const createSession = (req, res, _) => {
    const { sessionId, elapsedTime, startVideoUrl, currentVideoUrl, } = req.body;
    const session = new Session_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        sessionId,
        elapsedTime,
        startVideoUrl,
        currentVideoUrl,
    });
    return session
        .save()
        .then((session) => res.status(201).json({ session }))
        .catch((error) => res.status(500).json({ error }));
};
const readSession = (req, res, _) => {
    const sessionId = req.params.sessionId;
    return Session_1.default.findOne({ sessionId: sessionId })
        .then((session) => session
        ? res.status(200).json({ session })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllSession = (_, res, __) => {
    return Session_1.default.find()
        .then((session) => {
        res.status(200).json({ session });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
    });
};
const updateSession = async (req, res, _) => {
    const sessionId = req.params.sessionId;
    return Session_1.default.findOneAndUpdate({ sessionId: sessionId }, { $set: req.body }, { new: true })
        .then((session) => {
        if (session) {
            return session
                .save()
                .then((session) => res.status(201).json({ session }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteSession = (req, res, _) => {
    const sessionId = req.params.sessionId;
    return Session_1.default.findByIdAndDelete(sessionId)
        .then((session) => session
        ? res.status(201).json({ session, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createSession,
    readSession,
    readAllSession,
    updateSession,
    deleteSession,
};
//# sourceMappingURL=session.js.map