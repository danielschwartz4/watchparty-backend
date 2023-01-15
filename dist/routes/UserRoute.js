"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post("/create", user_1.default.createUser);
router.get("/get/:userId", user_1.default.readUser);
router.get("/get", user_1.default.readAllUser);
router.patch("/update/:userId", user_1.default.updateUser);
router.delete("/delete/:userId", user_1.default.deleteUser);
module.exports = router;
//# sourceMappingURL=UserRoute.js.map