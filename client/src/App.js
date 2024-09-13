import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserRegister from './UserRegister';
import MenuManagement from './MenuManagement'; // Asegúrate de que la ruta sea correcta
import './assets/css/App.css';
import Cronograma from './Cronograma';

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
          <Route path="/cronograma" element={<Cronograma />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
