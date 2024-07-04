import express from "express";
import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
import serverConfig from "./serversConfig.js";
import FIFOQueue from "./queueSystem/queueFIFO.js";
import PriorityQueue from "./queueSystem/queuePriority.js";
import RoundRobinQueue from "./queueSystem/queueRoundRobin.js";
import logger from "./logs/logger.js";

const servers = serverConfig.serverList;

const app = express();

// Initiating Queues
const fifoQueue = new FIFOQueue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue();

// Function to filter servers based on type and health
const getAvailableServers = (requestType) => {
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
      logger.error(
        `Failed to reach server ${server.hostName}:${server.port} in health Check`
      );

      server.active = false;
    }
  }
};

// Periodically check the health of servers
setInterval(checkServerHealth, 10000);

// Main function to redirect requests
const handleRequests = (queue) => {
  setInterval(() => {
    if (!queue.isEmpty()) {
      const request = queue.dequeue();
      const requestType = request.req.headers["requesttype"];
      const availableServers = getAvailableServers(requestType);
      if (availableServers.length > 0) {
        const targetServer = availableServers[0];
        logger.info(
          `Request of type ${requestType} handled by server ${targetServer.hostName}:${targetServer.port}`
        );
        createProxyMiddleware({
          target: `http://${targetServer.hostName}:${targetServer.port}`,
          changeOrigin: true,
        })(request.req, request.res, request.next);
      } else {
        request.res.status(503).send("Service Unavailable");
      }
    }
  }, 100);
};

app.use((req, res, next) => {
  const requestType = req.headers["requesttype"].toLowerCase();
  const priority = req.headers["priority"];
  if (requestType && requestType === "grpc") {
    if (priority) {
      logger.info(`Request handled by priority Queue `);
      priorityQueue.enqueue({ req, res, next, priority });
    } else {
      res
        .status(404)
        .send("Priority Header not Found. Provide Priority for gRPC request");
    }
  } else if (requestType && requestType === "graphql") {
    logger.info(`Request handled by Fifo Queue `);
    fifoQueue.enqueue({ req, res, next });
  } else {
    logger.info(`Request handled by Round Robin Queue `);
    roundRobinQueue.enqueue({ req, res, next });
  }
});

handleRequests(fifoQueue);
handleRequests(priorityQueue);
handleRequests(roundRobinQueue);

const port = 3000;
app.listen(port, () => {
  console.log(`Load balancer is running on port ${port}`);
  checkServerHealth();
});
