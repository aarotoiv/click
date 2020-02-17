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

            socket.on('click', function(data) {
                n++;
                let points = -1;
                if(n % 500 == 0) 
                    points += 250;
                else if(n % 100 == 0)       
                    points += 40;
                else if(n % 10 == 0) 
                    points += 5;

                socket.request.session.points += points;
                socket.request.session.save();

                const hitsTillPrize = n % 10 != 0 ? 10 - n % 10 : 10;
                socket.emit('youClicked', {points, hitsTillPrize});
            });
        });

    }
};