import express from "express";
import controller from "../controllers/session";

const router = express.Router();

router.post("/create", controller.createSession);
router.get("/get/:sessionId", controller.readSession);
router.get("/get", controller.readAllSession);
router.patch("/update/:sessionId", controller.updateSession);
router.delete("/delete/:sessionId", controller.deleteSession);

export = router;
