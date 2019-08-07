function chat(http) {

    const redis_words = require('./redis');
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
   // const redis = require('socket.io-redis');
   // io.adapter(redis({ host: ip, port: 6379 }));

    io.on("connection", (socket) => {

    // join room
    socket.on("joinRoom", () => {
        // ensure just connected to one database
        socket.leaveAll();
        // assign random name and save it to redis
        // assign radnom color
        const room = socket.request.headers.referer.split("/").slice(-1)[0];
        socket.join(room);
        socket.to(room).emit("success", `You have succesfully join the ${room} room`);        
    });

    // send and recieve message
    socket.on("send", (msg) => {
        // slow mode? every use just can chat every 30 secs
        const room = socket.request.headers.referer.split("/").slice(-1)[0];
        socket.nsp.to(room).emit("recieve", msg);
    });
    
    // disconnect
    socket.on('disconnect', function(){
        // delete it from database
        console.log('user disconnected');
    });

    })  
};

exports.chat = chat;