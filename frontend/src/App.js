import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import TeacherHomePage from './pages/TeacherHomePage';
import TeacherInputPage from './pages/TeacherInputPage';
import TeacherCurvePage from './pages/TeacherCurvePage';

import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function App() {

  const ProtectedRoute = ({ element, roles }) => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const decoded = jwtDecode(token);
      const userRoles = decoded.roles;
  
      if (roles.some(role => userRoles.includes(role))) {
        return element;
      }
    }
    return <Navigate to="/" replace />;
  };


  return (
    <>    
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/teacher/home" element={<ProtectedRoute element={<TeacherHomePage />} roles={["ADMIN", "TEACHER"]} />} />
          <Route path="/teacher/input" element={<ProtectedRoute element={<TeacherInputPage />} roles={["ADMIN", "TEACHER"]} />} />
          <Route path="/teacher/curve" element={<ProtectedRoute element={<TeacherCurvePage />} roles={["ADMIN", "TEACHER"]} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;



