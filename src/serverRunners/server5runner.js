import { createServer } from "../server.js";
import serverConfig from "../serversConfig.js";
createServer(
  serverConfig.serverList[4].hostName,
  serverConfig.serverList[4].port
);
