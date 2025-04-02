import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});


socket.on('trial message', (data) => {
  console.log('message from server',data.message); // or show a toast/notification UI
});

export default socket;