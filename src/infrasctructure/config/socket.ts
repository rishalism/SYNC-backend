import { Server, Socket } from "socket.io";



export default function socketServer(server: any) {


    /// intiliazing socket server 

    const io = new Server(server, {
        cors: {
            origin: process.env.CORS_URL,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
            credentials: true,
        }
    })


    
    io.on('connection', (socket) => {
        console.log('A user connected');
      
        socket.on('join_room', (room) => {
          socket.join(room);
          console.log(`User joined room: ${room}`);
        });
      
        socket.on('leave_room', (room) => {
          socket.leave(room);
          console.log(`User left room: ${room}`);
        });
      
        socket.on('send_message', (data) => {
          console.log('Received message:', data);
          io.to(data.room).emit('receive_message', data.message);
        });
      
        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      });


}