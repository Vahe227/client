import { useEffect, useState } from 'react'
import './App.css'
import client from 'socket.io-client'
const socket = client.io('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0);
  const [allUsers, setAllUsers] = useState({});
  const enemiesCounts = Object.values(allUsers);

  useEffect(() => {
    socket.on('update-count', (serverAllUsers) => {
      console.log('update-count', socket.id , serverAllUsers);
      const currentUserCount = serverAllUsers[socket.id];
      setCount(currentUserCount);
      delete serverAllUsers[socket.id];
      setAllUsers(serverAllUsers);
    });
    return () => {
      socket.off('update-count');
    };
  }, []);

  const handleButtonClick = () => {
    socket.emit('increase-count');
  }

  return (
    <>    
      <div className="card">
        <button onClick={handleButtonClick}>
          Click To Increase Count
        </button>
        <p>Your Count Is {count}</p>
        {enemiesCounts.map((count,index) => (
          <p key={index}>Enemy Count Is {count}</p>
        ))}
      </div>
    </>
  )
}

export default App
