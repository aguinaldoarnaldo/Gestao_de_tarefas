import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      console.log('Socket client connected');
    }
    return this.socket;
  }

  joinBoard(boardId) {
    if (this.socket) {
      this.socket.emit('join_board', boardId);
    }
  }

  onTaskChanged(callback) {
    if (this.socket) {
      this.socket.on('task_changed', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
