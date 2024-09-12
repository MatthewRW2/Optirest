import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserRegister from './UserRegister';
import MenuManagement from './MenuManagement'; // Asegúrate de que la ruta sea correcta
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/UserRegister" element={<UserRegister />} />
          <Route path="/menu-management" element={<MenuManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
