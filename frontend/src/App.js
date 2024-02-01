import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import TeacherHomePage from './pages/TeacherHomePage';
import TeacherInputPage from './pages/TeacherInputPage';
import TeacherCurvePage from './pages/TeacherCurvePage';
import StudentHomePage from './pages/StudentHomePage';
import StudentInputPage from './pages/StudentInputPage';
import StudentViewGradePage from './pages/StudentViewGradePage';
import TestPage from './pages/LoginPageTest';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import UserContext from './pages/user-context';
import { useState } from 'react';

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

  const [user, setUser] = useState(null);

  return (
    <>    
      <div>

        <UserContext.Provider value = {[user, setUser]}>
          <Routes>
            <Route path="/" element={<TestPage />} />
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/teacher/home" element={<ProtectedRoute element={<TeacherHomePage />} roles={["ADMIN", "TEACHER"]} />} />
            <Route path="/teacher/input" element={<ProtectedRoute element={<TeacherInputPage />} roles={["ADMIN", "TEACHER"]} />} />
            <Route path="/teacher/curve" element={<ProtectedRoute element={<TeacherCurvePage />} roles={["ADMIN", "TEACHER"]} />} />
            <Route path="/student/home" element={<ProtectedRoute element={<StudentHomePage />} roles={["ADMIN", "STUDENT"]} />} />
            <Route path="/student/input" element={<ProtectedRoute element={<StudentInputPage />} roles={["ADMIN", "STUDENT"]} />} />
            <Route path="/student/viewgrade" element={<ProtectedRoute element={<StudentViewGradePage />} roles={["ADMIN", "STUDENT"]} />} />
        
            </Routes>
        </UserContext.Provider>
        

      </div>
    </>
  );
}

export default App;



