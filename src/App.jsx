// Importing Packages 

import { useEffect, useRef, useState } from "react"
import client from 'socket.io-client'

// React.js code (front-end) is connected to Node.js code (back-end or Server code).

const socket = client.io('https://server-uar5.onrender.com');

function App() {

  // UseState is used for the number of changes, so that when Clint clicks on the button, the count is increased by 1.

  const [count,setCount] = useState(0);
  const [allUsers,setAllUsers] = useState({});

  // The enemiesCounts variable is created because we need to get the enemy counts as an array.

  const enemiesCounts = Object.values(allUsers);
  const [width,setWidth] = useState(30);
  const trackRef = useRef(null);

  const pxPerTile = width / 30;

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

// Createing second useEffect for ResizeObserver 

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    if(trackRef.current) resizeObserver.observe(trackRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Creating a handleButtonClick variable that has an arrow function that increments the count variable by 1 when the customer clicks the button.
  const handleButtonClick = () => {
    socket.emit('increase-count');
  };
  
  // App function returns client counts
  console.log(enemiesCounts)
  return (
    // By creating a div whose className is "card", and inside the div we have a button, for which when the customer clicks on that button, the sum of their counters increases by 1.
    <div className="flex flex-col gap-4">
      <div style={{ width: '90vw' , maxWidth: 900 }} ref={trackRef}>
        <div 
            style={{
              width: '100px',
              height: '100px',
              position: 'relative',
              left: `calc(${(count / 30) * 100}%)`,
              marginBottom: '10px',
              backgroundColor: 'pink',
              transition: `left ${pxPerTile * 3}ms linear`,
            }} 
          />
        {enemiesCounts.map((count,index) => {
          return (
            <div 
              style={{  
                width: '100px',
                height: '100px',
                position: 'relative',
                left: `calc(${(count / 30) * 100}%)`,
                marginBottom: '10px',
                backgroundColor: 'pink',
                transition: `left ${pxPerTile * 3}ms linear`, 
              }} 
              key={index}
          />
          )
        })}
      </div>
      <div className="card">
        <button onClick={handleButtonClick}>
          Click To Increase Count
        </button>
      </div>
    </div>
  )
};

export default App;