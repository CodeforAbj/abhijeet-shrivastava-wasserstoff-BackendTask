import { createServer } from "../server.js";
import serverConfig from "../serversConfig.js";
createServer(
  serverConfig.serverList[2].hostName,
  serverConfig.serverList[2].port
);
