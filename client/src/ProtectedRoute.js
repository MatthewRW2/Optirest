import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token y un rol en localStorage
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      setAuthenticated(true);
      setUserRole(role);

      // Verificar si el rol del usuario está en los roles permitidos
      if (allowedRoles && !allowedRoles.includes(role)) {
        navigate('/unauthorized');  // Redirigir si no tiene el rol adecuado
      }
    } else {
      navigate('/');  // Redirigir a login si no está autenticado
    }
  }, [navigate, allowedRoles]);

  return authenticated ? children : null;
};

export default ProtectedRoute;