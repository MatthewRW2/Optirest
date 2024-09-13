import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserRegister from './UserRegister';
import MenuManagement from './MenuManagement'; 
import './assets/css/App.css';
import Schedule from './Schedule';
import UserEdit from './UserEdit';
import ForgotYourPassword from './ForgotYourPassword'

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
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/userEdit" element={<UserEdit />} />
          <Route path="/ForgotYourPassword" element={<ForgotYourPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
