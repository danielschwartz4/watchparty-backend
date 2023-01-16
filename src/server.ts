import express from "express";
import http from "http";
import mongoose from "mongoose";
import WebSocket from "ws";
import { config } from "./config/config";
import eventRoutes from "./routes/EventRoute";
import sessionRoutes from "./routes/SessionRoute";
import userRoutes from "./routes/UserRoute";

const app = express();

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
    StartServer();
  })
  .catch((error) => {
    console.error(config.mongo.url);
    console.log("error", error);
  });

const StartServer = () => {
  // Logging
  app.use((req, res, next) => {
    console.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      console.info(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Rules
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  // Routes
  app.use("/user", userRoutes);
  app.use("/session", sessionRoutes);
  app.use("/event", eventRoutes);

  // Healthcheck
  app.get("/ping", (req, res, next) => {
    res.status(200).json({
      message: "pong",
    });
  });

  // Errors
  app.use((req, res, next) => {
    const error = new Error("not found");
    console.error(error);
    return res.status(404).json({
      message: error.message,
    });
  });

  app.listen(config.server.port || 3000, () => {
    console.info(`server is running on port ${config.server.port}`);
  });
};

// ________________WebSocket______________________

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

interface WebSocketInterface extends WebSocket {
  sessionId?: string | undefined;
  uid?: string | undefined;
}

wss.on("connection", function connection(ws: WebSocketInterface, req) {
  const sessionId = req.url?.split("/")[2];
  ws.sessionId = sessionId;

  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client: WebSocketInterface) {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.sessionId === ws.sessionId
      ) {
        client.send(data.toString());
      }
    });
  });
});

server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
