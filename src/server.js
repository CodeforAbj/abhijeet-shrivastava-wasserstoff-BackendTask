import express from "express";
import serverConfig from "./serversConfig.js";

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

// Running  all the servers
serverConfig.serverList.forEach((serverConfig) =>
  createServer(serverConfig.hostName, serverConfig.port)
);
