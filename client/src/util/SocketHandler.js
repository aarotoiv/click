import io from 'socket.io-client';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export default {
    async initialize(joined, receivedPoints, outOfPoints, doRetry) {
        //dummy get to server to initialize the session correctly
        await axios.get(URI + '/', {withCredentials: true});
        //connect to the socket
        const socket = await io(URI, {withCredentials: true});
        //initialize socket listeners
        socket.on('joinedServer', data => {
            joined(data.points);
        });
        
        socket.on('youClicked', data => {
            receivedPoints(data);
        });

        socket.on('outOfPoints', () => {
            outOfPoints();
        });
        
        socket.on('doRetry', data => {
            doRetry(data.points);
        });

        return socket;
    },
    //socket emitters for clicks
    click(socket) {
        socket.emit('click', {});
    },
    retry(socket) {
        socket.emit('retry', {});
    }
}