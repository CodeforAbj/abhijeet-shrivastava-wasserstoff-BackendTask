import express from "express";
import serverConfig from "./config.js";

function createServer(hostname, port) {
  const app = express();

  // Shared logic for all servers
  app.get("/", (req, res) => {
    res.send(`Namaste from server ${hostname}:${port}`);
  });

  app.listen(port, hostname, () => {
    console.log(`Server ${hostname} is On on port ${port}`);
  });

  return app; // return the instance for further customization
}

serverConfig.serverList.forEach((serverConfig) =>
  createServer(serverConfig.hostName, serverConfig.port)
);
