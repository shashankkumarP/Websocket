const express = require("express");
let app = express();
const http = require("http")
const cors = require('cors');

const {Server} = require("socket.io");
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
      origin: 'http://localhost:5173',
      methods:['GET','POST']
    }
  });
app.use(cors());
io.on('connection',(socket)=>{
   
    socket.on('join_room',(msg)=>{
       
        if(msg!=""){
            socket.join(msg);
        }
    })
    socket.on('message',(data)=>{
        if(data.room==""){
            socket.broadcast.emit('recieve_message',{data:data.data,from:"broadcast"})
        }else{
            socket.to(data.room).emit('recieve_message',{data:data.data,from:"room"});
        }
    })

})

server.listen('3001',()=>{
    console.log("connected");
})

