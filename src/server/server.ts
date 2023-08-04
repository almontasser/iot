import "dotenv/config";
import * as express from "express";
import * as net from "net";
import * as http from "http";
import * as bodyParser from "body-parser";
import sequelize, { Anchor, Emergency, Employee, Gas, Reading } from "./db";
import { Server as SocketServer } from "socket.io";
import apiRouter from "./routes";

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }

  const app = express();
  const server = http.createServer(app);
  const socketServer = new SocketServer(server);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // TCP server
  const tcpServer = net.createServer((socket) => {
    // Handle TCP connections
    console.log("TCP socket connected");

    socket.on("data", async (data) => {
      try {
        let payload;
        let http = false;
        // check if payload is http request
        if (data.toString().includes("HTTP/1.1")) {
          // read the body
          payload = data.toString().split("\r\n\r\n")[1];
          http = true;
        } else {
          payload = data.toString();
        }

        socketServer.emit("data", payload);

        const json = JSON.parse(payload);
        if (json.type === "anchor") {
          const anchor = (await Anchor.findOne({
            where: {
              key: json.id,
            },
          })) as any;
          await Gas.create({
            anchor_id: anchor.id,
            gas: json.g,
          });
        } else {
          const employee = (await Employee.findOne({
            where: {
              key: json.id,
            },
          })) as any;
          await Reading.create({
            employee_id: employee.id,
            sys: json.b[0],
            dia: json.b[1],
            hr: json.b[2],
            spo2: json.b[3],
            ranges: json.l,
          });

          if (json.e) {
            Emergency.create({
              employee_id: employee.id,
            });
          }
        }
        console.log("Received data:", payload);
        if (http) {
          console.log("Sending response");

          socket.write(
            "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 2\r\n\r\nOK"
          );
          socket.end();
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("close", () => {
      console.log("Socket closed");
    });
  });

  tcpServer.listen(8082, "0.0.0.0", () => {
    console.log("TCP server listening on 0.0.0.0:8082");
  });

  // WebSocket server
  socketServer.on("connection", (socket) => {
    console.log("WebSocket connected");
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  });

  app.use(express.static("public"));
  app.use(apiRouter);

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
}

main();
