const dotenv = require('dotenv')

dotenv.config();

const cors = require('cors')
const express = require('express')


const connectDB = require('./config/db');
const {Server} = require('socket.io')
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');



connectDB();





const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  
  app.use(cors());

app.use(express.json());



const onlineUsers = new Map();


io.on('connection', (socket) => {
  console.log('User Connected', socket.id);

  socket.on('newPin', (pin) => {
      io.emit('newPin', pin);
      console.log("New Pin emitted:", pin);
  });


  socket.on('newBoard', (board) => {
      // Broadcast the new story to all connected users
      io.emit('newBoard', board);
  });

  socket.on('newUpload', (upload) => {
    // Broadcast the new story to all connected users
    io.emit('newUpload', upload);
});


  socket.on('joins',(userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} joined`, onlineUsers);
  });


  socket.on('disconnect', () => {
      console.log('User Disconnected',socket.id);

for (let [userId, socketId] of onlineUsers.entries()){
  if(socketId === socket.id){
      onlineUsers.delete(userId);
      break;
  }
}
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/uploads', uploadRoutes);

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));