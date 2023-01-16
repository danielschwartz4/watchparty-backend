import express from "express";
import controller from "../controllers/event";

const router = express.Router();

router.post("/create", controller.createEvent);
router.get("/get/:eventId", controller.readEventById);
router.get("/getSessionEvents/:sessionId", controller.readEventBySessionId);
router.get("/get", controller.readAllEvent);
router.patch("/update/:eventId", controller.updateEvent);
router.delete("/delete/:eventId", controller.deleteEvent);

export = router;
