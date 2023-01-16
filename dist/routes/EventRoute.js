"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const event_1 = __importDefault(require("../controllers/event"));
const router = express_1.default.Router();
router.post("/create", event_1.default.createEvent);
router.get("/get/:eventId", event_1.default.readEventById);
router.get("/get/:sessionId", event_1.default.readEventBySessionId);
router.get("/get", event_1.default.readAllEvent);
router.patch("/update/:eventId", event_1.default.updateEvent);
router.delete("/delete/:eventId", event_1.default.deleteEvent);
module.exports = router;
//# sourceMappingURL=EventRoute.js.map