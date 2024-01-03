import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import TeacherHomePage from './pages/TeacherHomePage';
import TeacherInputPage from './pages/TeacherInputPage';
import TeacherCurvePage from './pages/TeacherCurvePage';

function App() {
  return (
    <>    
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/teacher/home" element={<TeacherHomePage />} />
          <Route path="/teacher/input" element={<TeacherInputPage />} />
          <Route path="/teacher/curve" element={<TeacherCurvePage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;



