const socket = require('socket.io');
//how many clicks the server has received
//if this ever hits Number.MAX_SAFE_INTEGER, then i'll consider myself a successful gamedev
let n = 0;

module.exports = {
    //initialize socket and the listeners
    initSocket: function(server, session) {
        console.log("socket running");

        const io = socket(server);

        //add express session to socket.request
        io.use(function(socket, next) {
            session(socket.request, {}, next);
        });
        
        //on connection check if session contains points, if not then add them
        io.on('connection', function(socket) {
            let points = 0;
            if(!socket.request.session.points) {
                socket.request.session.points = 20;
                socket.request.session.save();
                points = socket.request.session.points;
            } else 
                points = socket.request.session.points;
            
            //return players points to the player
            socket.emit('joinedServer', {points});

            //click happened, so get n(buttonclicks) and get the points
            socket.on('click', function(data) {
                n++;
                let points = -1;
                if(n % 500 == 0) 
                    points += 250;
                else if(n % 100 == 0)       
                    points += 40;
                else if(n % 10 == 0) 
                    points += 5;

                //save the points on session
                socket.request.session.points += points;
                socket.request.session.save();

                //get the hitstillprize 
                const hitsTillPrize = n % 10 != 0 ? 10 - n % 10 : 10;
                //depending on whether player runs out of points or not, return outofpoints or youclicked to the client
                if(socket.request.session.points > 0) 
                    socket.emit('youClicked', {points, hitsTillPrize});
                else 
                    socket.emit('outOfPoints', {});
            });
            
            //on retry
            //set points to 20 and return the points to the player
            socket.on('retry', function(data) {
                socket.request.session.points = 20;
                socket.request.session.save();
                points = socket.request.session.points;

                socket.emit('doRetry', {points});
            });
        });

    }
};