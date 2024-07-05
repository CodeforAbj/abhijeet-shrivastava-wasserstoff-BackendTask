import { app, checkServerHealth } from "./DynamicLoadBalancer.js";
import { createServer } from "./server.js";
import serverConfig from "./serversConfig.js";

serverConfig.serverList.forEach((serverConfig) =>
  createServer(serverConfig.hostName, serverConfig.port)
);

const port = 3000;
app.listen(port, () => {
  console.log(`Load balancer is running on port ${port}`);
  checkServerHealth();
});
