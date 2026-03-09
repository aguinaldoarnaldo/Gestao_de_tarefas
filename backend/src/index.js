const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for development
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Store IO in app to access it in routes/controllers
app.set('io', io);

// Handle Socket Connections
io.on('connection', (socket) => {
  console.log('User connected to socket:', socket.id);
  
  socket.on('join_board', (boardId) => {
    socket.join(`board_${boardId}`);
    console.log(`Socket ${socket.id} joined board ${boardId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from socket');
  });
});

// Middleware
app.use(cors());
app.use(morgan('dev')); // Logger for requests
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/attachments', require('./routes/attachmentRoutes'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API de Gestão de Tarefas está rodando!');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({ 
    message: 'Ocorreu um erro interno no servidor.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando e pronto para Real-Time na porta ${PORT}`);
});
