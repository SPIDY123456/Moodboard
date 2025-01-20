require('dotenv').config();

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





io.on('connection',(socket)=> {
    console.log('User connected', socket.id);
    socket.on('updateBoard',(data)=> {
        socket.broadcast.emit('boardupdated',data);
});
socket.on('disconnect',() => {
    console.log('User disconnected',socket.id);  
});
});

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/uploads', uploadRoutes);

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));