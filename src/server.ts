import express from "express";
import http from "http";
import WebSocket from "ws";

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

interface WebSocketInterface extends WebSocket {
  sessionId?: string | undefined;
}

wss.on("connection", function connection(ws: WebSocketInterface, req) {
  // !! If undefined go home
  console.log("CONNECTION");
  const sessionId = req.url?.split("/")[2];
  ws.sessionId = sessionId;

  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client: WebSocketInterface) {
      console.log(client === ws);
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
