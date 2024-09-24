"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketServer;
const socket_io_1 = require("socket.io");
function socketServer(server) {
    /// intiliazing socket server 
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CORS_URL,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
            credentials: true,
        }
    });
    let onlineUsers = [];
    const addnewUsers = (userid, socketId) => {
        !onlineUsers.some((user) => user.userid === userid) && onlineUsers.push({ userid, socketId });
    };
    const removeUser = (socektid) => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socektid);
    };
    const getUser = (userId) => {
        return onlineUsers.find((user) => user.userid === userId);
    };
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
            removeUser(socket.id);
        });
        socket.on('new_user', (userId) => {
            addnewUsers(userId, socket.id);
        });
        socket.on('send_notification', (userid) => {
            const getuser = getUser(userid);
            if (getuser)
                socket.to(getuser === null || getuser === void 0 ? void 0 : getuser.socketId).emit('receive_notification', { message: 'you got a new task !' });
        });
    });
}
