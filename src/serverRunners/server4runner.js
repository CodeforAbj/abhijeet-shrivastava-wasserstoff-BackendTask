import { createServer } from "../server.js";
import serverConfig from "../serversConfig.js";
createServer(
  serverConfig.serverList[3].hostName,
  serverConfig.serverList[3].port
);