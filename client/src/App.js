import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import UserRegister from './UserRegister';
import MenuManagement from './MenuManagement'; 
import ProtectedRoute from './ProtectedRoute';
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
import Waste from './Waste';
import ChangePassword from './ChangePassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/UserRegister" element={<ProtectedRoute><UserRegister /></ProtectedRoute>} />
          <Route path="/menu-management" element={<ProtectedRoute><MenuManagement /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="/userEdit" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
          <Route path="/ForgotYourPassword" element={<ForgotYourPassword />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/userList" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/UserEdit/:nDocumento" element={<ProtectedRoute><UserEdit /></ProtectedRoute>}/>
          <Route path="/waste" element={<ProtectedRoute><Waste/></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

