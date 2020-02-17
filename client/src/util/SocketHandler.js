import io from 'socket.io-client';

const URI = 'http://localhost:5000';

export default {
    async initialize(joined, receivedPoints) {
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