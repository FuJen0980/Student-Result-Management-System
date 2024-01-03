import {Routes, Route } from 'react-router-dom';
import Body from './pages/homepage';
import UserListPage from './pages/UserListPage';
import 'bootstrap/dist/css/bootstrap.css';
import Teacher_home from './pages/Teacher_homepage';
import Teacher_input from './pages/teacher_input';
import Teacher_curve from './pages/Teacher_curve';

function App() {
  return (
    <>    
      <div>
        <Routes>
      
          <Route path="/users" element={<UserListPage />} />
          <Route path="/" element={<Body />} />
          <Route path="/teacher_home" element={<Teacher_home />} />
          <Route path="/teacher_input" element={<Teacher_input />} />
          <Route path="/teacher_curve" element={<Teacher_curve/>} />
            
        </Routes>

      </div>
    </>
  );
}

export default App;



