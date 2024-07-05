import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[5].hostName,
  serverConfig.serverList[5].port
);
