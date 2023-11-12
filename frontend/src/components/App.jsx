
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from '../styles/global.module.css';
import Login from '../views/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={<h1>Signup</h1>} />
      </Routes>
    </Router>
  )
}

export default App
