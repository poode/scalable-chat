function chat(http) {

    const redis_words = require('./redis');
    const {ip} = require('./config');

    // socket io config
    const io = require('socket.io')(http);
   // const redis = require('socket.io-redis');
   // io.adapter(redis({ host: ip, port: 6379 }));

    io.on("connection", (socket) => {

        // join room
        socket.on("joinRoom", () => {
            socket.emit("success", "You have succesfully join the room");
        });

        // disconnect
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    })  
};

exports.chat = chat;