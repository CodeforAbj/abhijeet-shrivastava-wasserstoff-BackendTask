import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[3].hostName,
  serverConfig.serverList[3].port
);
