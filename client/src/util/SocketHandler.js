import io from 'socket.io-client';
import axios from 'axios';

const URI = 'http://localhost:5000';

export default {
    async initialize(joined, receivedPoints) {
        await axios.get(URI + '/', {withCredentials: true});
        const socket = await io(URI, {withCredentials: true});
        
        socket.on('joinedServer', data => {
            joined(data.points);
        });
        
        socket.on('youClicked', data => {
            receivedPoints(data);
        });

        return socket;
    },
    click(socket) {
        socket.emit('click', {});
    }
}