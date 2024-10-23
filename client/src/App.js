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
import TotalLunches from './totallunches';
import Unauthorized from './Unauthorized';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute allowedRoles={["Docente", "Administrador","PersonalDeCocina","Inactivo"]}><Home /></ProtectedRoute>} />
          <Route path="/UserRegister" element={<ProtectedRoute allowedRoles={["Docente", "Administrador"]}><UserRegister /></ProtectedRoute>} />
          <Route path="/menu-management" element={<ProtectedRoute allowedRoles={["PersonalDeCocina", "Administrador"]}><MenuManagement /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute allowedRoles={["PersonalDeCocina","Docente", "Administrador"]}><Schedule /></ProtectedRoute>} />
          <Route path="/userEdit" element={<ProtectedRoute allowedRoles={["Administrador"]}><UserEdit /></ProtectedRoute>} />
          <Route path="/ForgotYourPassword" element={<ForgotYourPassword />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/statistics" element={<ProtectedRoute allowedRoles={["Docente", "Administrador"]}><Statistics /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={["Docente", "Administrador"]}><Reports /></ProtectedRoute>} />
          <Route path="/settings/:nDocumento" element={<ProtectedRoute allowedRoles={["Docente", "Administrador","PersonalDeCocina","Inactivo"]}><Settings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["Docente", "Administrador","PersonalDeCocina","Inactivo"]}><Profile /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute allowedRoles={["PersonalDeCocina", "Administrador"]}><Inventory /></ProtectedRoute>} />
          <Route path="/userList" element={<ProtectedRoute allowedRoles={["Administrador"]}><UserList /></ProtectedRoute>} />
          <Route path="/UserEdit/:nDocumento" element={<ProtectedRoute allowedRoles={["Administrador"]}><UserEdit /></ProtectedRoute>}/>
          <Route path="/waste" element={<ProtectedRoute allowedRoles={["PersonalDeCocina", "Administrador"]}><Waste/></ProtectedRoute>}/>
          <Route path="/totallunches" element={<ProtectedRoute allowedRoles={["PersonalDeCocina", "Administrador"]}  ><TotalLunches/></ProtectedRoute>}/>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

