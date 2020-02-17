import io from 'socket.io-client';
import axios from 'axios';

const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

export default {
    async initialize(joined, receivedPoints, outOfPoints, doRetry) {
        await axios.get(URI + '/', {withCredentials: true});
        const socket = await io(URI, {withCredentials: true});
        
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
    click(socket) {
        socket.emit('click', {});
    },
    retry(socket) {
        socket.emit('retry', {});
    }
}