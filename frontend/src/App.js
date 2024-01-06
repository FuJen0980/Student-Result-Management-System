import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import TeacherHomePage from './pages/TeacherHomePage';
import TeacherInputPage from './pages/TeacherInputPage';
import TeacherCurvePage from './pages/TeacherCurvePage';
import TestPage from './pages/LoginPageTest';

function App() {
  return (
    <>    
      <div>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/teacher/home" element={<TeacherHomePage />} />
          <Route path="/teacher/input" element={<TeacherInputPage />} />
          <Route path="/teacher/curve" element={<TeacherCurvePage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;



