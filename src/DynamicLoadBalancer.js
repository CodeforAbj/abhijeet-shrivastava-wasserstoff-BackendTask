import express from "express";
import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
import serverConfig from "./serversConfig.js";

const servers = serverConfig.serverList;

const app = express();

// Function to filter servers based on type and health
const getAvailableServers = (requestType) => {
  console.log(servers);
  let availableServers = servers.filter((server) => {
    return (
      server.active && server.type.toLowerCase() === requestType.toLowerCase()
    );
  });
  return availableServers.sort((a, b) => a.responseTime - b.responseTime);
};

// Function to check the health of servers and update response time and active status
const checkServerHealth = async () => {
  for (const server of servers) {
    try {
      const start = Date.now();
      const response = await axios.get(
        `http://${server.hostName}:${server.port}`
      );
      const end = Date.now();
      server.responseTime = end - start;
      server.active = true;
    } catch (error) {
      console.error(`Failed to reach server ${server.hostName}:${server.port}`);
      server.active = false;
    }
  }
};

// Periodically check the health of servers
setInterval(checkServerHealth, 10000);

// Main function to redirect requests
app.use((req, res, next) => {
  const requestType = req.headers["requesttype"]; // Access request header
  if (requestType) {
    const availableServers = getAvailableServers(requestType);
    if (availableServers.length > 0) {
      const targetServer = availableServers[0];
      createProxyMiddleware({
        target: `http://${targetServer.hostName}:${targetServer.port}`,
        changeOrigin: true,
      })(req, res, next);
    } else {
      res.status(503).send("Service Unavailable");
    }
  } else {
    res.status(400).send("Request header 'requestType' is missing");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Load balancer is running on port ${port}`);
  checkServerHealth();
});
