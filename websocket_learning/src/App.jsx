import { useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client';

const socket = new io('http://localhost:3001');
function App() {
  const message = useRef('');
  const room = useRef('');
  const [recivedmsg,setRecivedmsg] = useState({data:"",from:""});
  

  const handlejoin = ()=>{
    if(room.current.value!=""){
      socket.emit('join_room',room.current.value)
      
    }
  }

  const Sendmessage = ()=>{
    
    socket.emit('message',{data:message.current.value,room:room.current.value})
    


  };

  useEffect(()=>{
    socket.on('recieve_message',(d)=>{
      setRecivedmsg(d);
    })
    
  },[socket])
  


  return (
    <div>
     <div style={{display:'flex',gap:'10px'}} >
      <input type="text" placeholder='type room number for group' ref={room} />
      <button onClick={()=>handlejoin()} >Join</button>
     </div>
     <div style={{display:'flex',gap:'10px'}} >
     <input type="text" ref={message}  placeholder='write message here'  />
     <button onClick={()=>Sendmessage()} >Send Message</button>

     </div>
     <div>
      <h4>Messages: </h4>
      
        <div  style={{display:"flex",gap:"10px"}} >
          <p>{recivedmsg.from}</p>
          <h3>{recivedmsg.data}</h3>
        </div>
     
     </div>
     

    </div>
  )
}

export default App
