const socket = require('socket.io');

let n = 0;

module.exports = {
    initSocket: function(server, session) {
        console.log("socket running");

        const io = socket(server);

        io.use(function(socket, next) {
            session(socket.request, {}, next);
        });
        
        io.on('connection', function(socket) {


            socket.on('disconnect', function(data) {
                
            });
        });

    }
};