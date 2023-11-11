
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/global.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
      </Routes>
    </Router>
  )
}

export default App
