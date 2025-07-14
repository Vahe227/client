// Importing Packages 

import { useEffect, useState } from "react"
import client from 'socket.io-client'

// React.js code (front-end) is connected to Node.js code (back-end or Server code).

const socket = client.io('http://localhost:3000');

function App() {

  // UseState is used for the number of changes, so that when Clint clicks on the button, the count is increased by 1.

  const [count,setCount] = useState(0);
  const [allUsers,setAllUsers] = useState({});

  // The enemiesCounts variable is created because we need to get the enemy counts as an array.

  const enemiesCounts = Object.values(allUsers);

  // Using useEffect and inside it useState

  useEffect(() => {

    // responding to the "update count" event

    socket.on('update-count', (serverAllUsers) => {

// In the console, we print the line 'update-count' and the client IDs.

      console.log('update-count', socket.id, serverAllUsers);
      //  A currentUserCount variable is created, which contains the client count.
      const currentUserCount = serverAllUsers[socket.id];
      // We set that count in the setCount function with useState
      setCount(currentUserCount);
      // All customer counts are being deleted. 
      delete serverAllUsers[socket.id];
      setAllUsers(serverAllUsers);
    });
    
    socket.on('winner', (winnerId) => {
      if(winnerId == socket.id) {
        alert('Game over,you won');
        return;
      };
      alert('Game Over');
    });
    
    return () => {
      // turn off 'update-count' event 
      socket.off('winner');
      socket.off('update-count');
    };
  }, []);

  // Creating a handleButtonClick variable that has an arrow function that increments the count variable by 1 when the customer clicks the button.
  const handleButtonClick = () => {
    socket.emit('increase-count');
  };
  
  // App function returns client counts
  console.log(enemiesCounts)
  return (
    // By creating a div whose className is "card", and inside the div we have a button, for which when the customer clicks on that button, the sum of their counters increases by 1.
    <>
      <div 
          style={{
            width: '100px',
            height: '100px',
            position: 'relative',
            left: `${count * 10}px`,
            marginButtom: '10px',
            backgroundColor: 'pink'
          }} 
        />
      {enemiesCounts.map((count,index) => {
        <div 
          style={{  
            width: '100px',
            height: '100px',
            position: 'relative',
            left: `${count * 10}px`,
            marginButtom: '10px',
            backgroundColor: 'pink'
          }} 
          key={index}
        />
      })}
      <div className="card">
      <button onClick={handleButtonClick}>
        Click To Increase Count
      </button>
      </div>
    </>
  )
};

export default App;