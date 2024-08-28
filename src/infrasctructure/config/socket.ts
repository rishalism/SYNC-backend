import { Server, Socket } from "socket.io";



export default function socketServer(server: any) {

  interface OnlineUsers {
    userid: string;
    socketId: string;
  }


  /// intiliazing socket server 

  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_URL,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    }
  })

  let onlineUsers: OnlineUsers[] = []



  const addnewUsers = (userid: string, socketId: string) => {
    !onlineUsers.some((user) => user.userid === userid) && onlineUsers.push({ userid, socketId })
  }

  const removeUser = (socektid: string) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socektid);
  }

  const getUser = (userId: string) => {
    return onlineUsers.find((user) => user.userid === userId);
  }



  io.on('connection', (socket) => {

    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on('leave_room', (room) => {
      socket.leave(room);
      console.log(`User left room: ${room}`);
    });

    socket.on('send_message', (data) => {
   
      io.to(data.room).emit('receive_message', data.message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      
      removeUser(socket.id)
    });


    socket.on('new_user', (userId) => {
      addnewUsers(userId, socket.id)
    })


    socket.on('send_notification', (userid) => {
      const getuser = getUser(userid)
      if (getuser)
        socket.to(getuser?.socketId).emit('receive_notification', { message: 'you got a new task !' })
    })

  });


}