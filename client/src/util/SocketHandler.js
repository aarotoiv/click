import io from 'socket.io-client';
import axios from 'axios';

const URI = 'http://localhost:5000';

export default {
    async initialize(joined) {
        const socket = await io(URI, {withCredentials: true});
        socket.on('joinedServer', data => {
            joined(data.points);
        });
        return socket;
    }
}