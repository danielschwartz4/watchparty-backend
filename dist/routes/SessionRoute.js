"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("../controllers/session"));
const router = express_1.default.Router();
router.post("/create", session_1.default.createSession);
router.get("/get/:sessionId", session_1.default.readSession);
router.get("/get", session_1.default.readAllSession);
router.patch("/update/:sessionId", session_1.default.updateSession);
router.delete("/delete/:sessionId", session_1.default.deleteSession);
module.exports = router;
//# sourceMappingURL=SessionRoute.js.map