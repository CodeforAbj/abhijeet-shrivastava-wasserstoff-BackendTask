import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[4].hostName,
  serverConfig.serverList[4].port
);
