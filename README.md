# Scalable chat developed in Node.js, Express, Docker, socketio, Redis and Nginx

This is a simple chat using websockets through socketio, it has a slow mode (permit to write every X seconds to each user).  
To run it, need to have Docker Compose installed.  
```bash
npm run start-structure  #To start it 
npm run stop-structure #To stop it
npm run rebuild-structure #To rebuild for changes  
```

It ups two nodejs nodes, one Nginx node (balancer) and one Redis node.  
[socketio web](https://socket.io/)  
[info about socketio balancing](https://socket.io/docs/using-multiple-nodes/#Sticky-load-balancing)

(TODO: add sessions)
    
