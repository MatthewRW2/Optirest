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
import Statistics from './Statistics'
import Reports from './Reports'
import Settings from './Settings'
import Profile from './Profile'
import Inventory from './Inventory';
import UserList from './UserList';

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
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/UserEdit/:nDocumento" element={<UserEdit />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

