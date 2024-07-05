import { createServer } from "../server.js";
import serverConfig from "../serversConfig.js";
createServer(
  serverConfig.serverList[1].hostName,
  serverConfig.serverList[1].port
);
