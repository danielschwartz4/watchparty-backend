"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const ws_1 = __importDefault(require("ws"));
const config_1 = require("./config/config");
const EventRoute_1 = __importDefault(require("./routes/EventRoute"));
const SessionRoute_1 = __importDefault(require("./routes/SessionRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const request_1 = __importDefault(require("request"));
const constants_1 = require("./constants");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(() => {
    console.log("connected");
    StartServer();
})
    .catch((error) => {
    console.error(config_1.config.mongo.url);
    console.log("error", error);
});
const StartServer = () => {
    app.use((req, res, next) => {
        console.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            console.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    app.use("/user", UserRoute_1.default);
    app.use("/session", SessionRoute_1.default);
    app.use("/event", EventRoute_1.default);
    app.get("/ping", (req, res, next) => {
        res.status(200).json({
            message: "pong",
        });
    });
    app.use((req, res, next) => {
        const error = new Error("not found");
        console.error(error);
        return res.status(404).json({
            message: error.message,
        });
    });
    app.listen(config_1.config.server.port || 3000, () => {
        console.info(`server is running on port ${config_1.config.server.port}`);
    });
};
const port = 8080;
const server = http_1.default.createServer(express_1.default);
const wss = new ws_1.default.Server({ server });
wss.on("connection", function connection(ws, req) {
    var _a;
    const sessionId = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("/")[2];
    ws.sessionId = sessionId;
    ws.on("close", function close(c) {
        console.log("client disconnected");
        if (wss.clients.size == 0) {
            const params = {
                userId: "end",
                sessionId: sessionId,
                type: "Pause",
                sessionIncrement: 1,
                timeStamp: 1,
            };
            const options = {
                uri: `${constants_1.CURRENT_URL}/event/create`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                json: params,
            };
            (0, request_1.default)(options, (error, response, body) => {
                if (!error && response.statusCode === 201) {
                    console.log(body);
                }
            });
        }
    });
    ws.on("message", function incoming(data) {
        wss.clients.forEach(function each(client) {
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