import { useState } from 'react'
import './App.css'
import client from 'socket.io-client'
const socket = client.io('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
