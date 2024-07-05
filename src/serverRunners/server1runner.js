import { createServer } from "./server.js";
import serverConfig from "./src/serversConfig";
createServer(
  serverConfig.serverList[0].hostName,
  serverConfig.serverList[0].port
);
