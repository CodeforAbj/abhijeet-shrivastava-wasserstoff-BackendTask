import express from "express";
import serverConfig from "./serversConfig.js";

function createServer(hostname, port) {
  const app = express();

  // Shared logic for all servers
  app.get("/", (req, res) => {
    res.send(`Namaste from server ${hostname}:${port}`);
  });

  app.get("/slowtask", (req, res) => {
    setTimeout(() => {
      res.status(200).send("ssssssslllllllllllloooooooowwwwwwwwwwwwww world");
    }, 10000); // simulate a slow task with 10 seconds delay
  });

  app.get("/fasttask", (req, res) => {
    res.status(200).send("Vroom Vroom");
  });

  app.get("/healthcheck", (req, res) => {
    res.status(200).send("I'm healthy");
  });

  app.listen(port, hostname, () => {
    console.log(`Server ${hostname} is On on port ${port}`);
  });

  return app; // return the instance for further customization
}

// Running  all the servers
serverConfig.serverList.forEach((serverConfig) =>
  createServer(serverConfig.hostName, serverConfig.port)
);