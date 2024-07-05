
"I've developed a sophisticated load balancer that intelligently routes requests based on response time for REST, GraphQL, and gRPC APIs. The system dynamically redirects incoming traffic to servers with the least response time, optimizing performance. Additionally, I've implemented robust queue systems including FIFO, priority, and round-robin, enhancing request handling efficiency. For testing and demonstration, I've set up 6 servers using Express and utilized Postman for thorough testing. Demo on my YouTube channel!"
Demo Link - https://youtu.be/jkvjsKCXL24
Post Json in Repo Above too

Currently there is an issue on render.com deployed loadbalancer thus I am providing code that works on local host too in wasserstoff-local folder. while in src is live code for hosted site. 

To run the local version 
```
cd <local folder> / src
node server.js
node DynamicLoadBalancer.js
```

then you can run postman 
where all request are get and requesttype header (rest,grpc,graphql) is needed for specific server to be reached 
