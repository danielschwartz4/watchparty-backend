"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const port = 8080;
const server = http_1.default.createServer(express_1.default);
const wss = new ws_1.default.Server({ server });
wss.on("connection", function connection(ws, req) {
    var _a;
    console.log("CONNECTION");
    const sessionId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")[2];
    ws.sessionId = sessionId;
    ws.on("message", function incoming(data) {
        wss.clients.forEach(function each(client) {
            console.log(client === ws);
            if (client !== ws &&
                client.readyState === ws_1.default.OPEN &&
                client.sessionId === ws.sessionId) {
                client.send(data.toString());
            }
        });
    });
});
server.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map