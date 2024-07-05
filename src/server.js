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

  app.listen(port, () => {
    console.log(`Server ${hostname} is On on port ${port}`);
  });

  app.get("/test", (req, res) => {
    console.log("Server Approached successfully");
    res.status(200).send("Test Success");
  });

  return app; // return the instance for further customization
}

// for demonstration purpose the Running  all the servers feature is moved to index.js
// serverConfig.serverList.forEach((serverConfig) =>
//   createServer(serverConfig.hostName, serverConfig.port)
// );

export { createServer };
