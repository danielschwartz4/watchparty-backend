"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res, _) => {
    const { name, sessionId } = req.body;
    const user = new User_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        name,
        sessionId,
    });
    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const readUser = (req, res, _) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then((user) => user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAllUser = (_, res, __) => {
    return User_1.default.find()
        .then((user) => {
        res.status(200).json({ user });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
    });
};
const updateUser = (req, res, _) => {
    const userId = req.params.userId;
    return User_1.default.findById(userId)
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteUser = (req, res, _) => {
    const userId = req.params.userId;
    return User_1.default.findByIdAndDelete(userId)
        .then((user) => user
        ? res.status(201).json({ user, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createUser,
    readUser,
    readAllUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.js.map