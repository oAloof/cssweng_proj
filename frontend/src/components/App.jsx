
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from '../styles/global.module.css';
import Login from '../views/login';
import Register1 from '../views/registerPage1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register/1" element={ <Register1 /> } />
      </Routes>
    </Router>
  )
}

export default App
