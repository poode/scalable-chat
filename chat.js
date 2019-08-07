function chat(http) {

    const redis = require('./redis');
    const {ip} = require('./config');


const colors = [  
    "#FF0000",
    "#0000FF",
    "#008000",
    "#B22222",
    "#FF7F50",
    "#9ACD32",
    "#FF4500",
    "#2E8B57",
    "#DAA520",
    "#D2691E",
    "#5F9EA0",
    "#1E90FF",
    "#FF69B4",
    "#8A2BE2",
    "#00FF7F",
];

    // socket io config
    const io = require('socket.io')(http);
    const socket_redis = require('socket.io-redis');
    io.adapter(socket_redis({ host: ip, port: 6379 }));

    io.on("connection", (socket) => {

    // join room
    socket.on("joinRoom", async () => {
        // assign random name and save it to redis
        // assign radnom color
        const room = socket.request.headers.referer.split("/").slice(-1)[0];
        await redis.getRedisVariable(room) ? redis.increment(room) : redis.setRedisVariable(room, 1); 
        socket.join(room);
        socket.to(room).emit("success", `You have succesfully join the ${room} room`);        
    });

    // send and recieve message
    socket.on("send", async(msg) => {
        // slow mode? every use just can chat every X secs
        let cookie = socket.request.headers.cookie.substring(3);
        const room = socket.request.headers.referer.split("/").slice(-1)[0];
        let wrote_30sec = await redis.getRedisVariable(cookie);
        if (wrote_30sec === room) {
            let response = "Slow mode activated, can write every X secs"
            io.of('/').sockets[socket.id].emit("recieve",response);
        }else {
            redis.setRedisVariable(cookie, room, 18);
            socket.nsp.to(room).emit("recieve", msg);
        }
        
    });
    
    // disconnect
    socket.on('disconnect', async () => {
        // delete it
        const room = socket.request.headers.referer.split("/").slice(-1)[0];
        redis.decrement(room);
        let connections = await redis.getRedisVariable(room);
        console.log(`user from ${room} disconnected, ${connections} connections`);
    });

    })  
};

exports.chat = chat;