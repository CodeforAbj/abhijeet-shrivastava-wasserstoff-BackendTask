import { createServer } from "../server.js";
import serverConfig from "../serversConfig.js";
createServer(
  serverConfig.serverList[5].hostName,
  serverConfig.serverList[5].port
);
