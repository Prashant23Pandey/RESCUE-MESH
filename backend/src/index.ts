import dotenv from "dotenv";
import { app } from "./app";
/* Authors: BENADIC90, Member 1, Member 2, Member 3 */
import { createServer } from "node:http";
import { Server } from "socket.io";

dotenv.config();

// Yjs Setup
import { WebSocketServer } from 'ws';
// @ts-ignore
import { setupWSConnection } from 'y-websocket/bin/utils';

const yjsPort = 1234;
const wss = new WebSocketServer({ port: yjsPort });
wss.on('connection', setupWSConnection);
console.log(`Yjs WebSocket server listening on port ${yjsPort}`);


const port = Number(process.env.PORT ?? 4000);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.locals.io = io;

io.on("connection", (socket) => {
  console.log("Client connected via Socket.IO:", socket.id);
});

server.listen(port, () => {
  console.log(`RESCUE-MESH backend listening on port ${port}`);
});
