
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import styles from '../styles/global.module.css';
import Login from '../views/login';
import Register1 from '../views/registerPage1';
import Register2 from '../views/registerPage2';

import { RegistrationProvider } from '../contexts/RegistrationContext';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <RegistrationProvider /> }>
          <Route index element={<Navigate to="/register/1" />} />
          <Route path="1" element={<Register1 />} />
          <Route path="2" element={<Register2 />} />
        </Route>
      </Routes>
    
    </Router>
  )
}

export default App
