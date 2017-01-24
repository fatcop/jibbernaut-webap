import io from 'socket.io-client';
import { addMessage } from './actions';
import { store } from './store.js';

let socket;

export function start() {

  // Connect with server API
  
  socket = io('http://localhost:3000');

  socket.on('connect', () => {
    let state = store.getState();
    socket.emit('past messages',
      state.chatMessages.length ? state.chatMessages[state.chatMessages.length] : 0
    );
  });

  socket.on('message', (message) => {
    store.dispatch(addMessage(message.text, message.from));
  });

}

export function sendMessage(text, from) {
  socket.send({text, from});
}

export default {
  start,
  sendMessage
}