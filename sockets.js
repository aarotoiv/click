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
            let points = 0;
            if(!socket.request.session.points) {
                socket.request.session.points = 20;
                socket.request.session.save();
                points = socket.request.session.points;
            } else 
                points = socket.request.session.points;
            
            socket.emit('joinedServer', {points});
        });

    }
};