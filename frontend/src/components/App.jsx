import { useState } from 'react'
import '../styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello, World!</h1>
      <p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        {' '}
        <b>{count}</b>
      </p>
    </>
  )
}

export default App
