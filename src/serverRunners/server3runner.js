import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[2].hostName,
  serverConfig.serverList[2].port
);
