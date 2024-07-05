import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[1].hostName,
  serverConfig.serverList[1].port
);
