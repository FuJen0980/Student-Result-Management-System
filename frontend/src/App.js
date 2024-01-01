import {Routes, Route } from 'react-router-dom';
import Body from './pages/homepage';
import UserListPage from './pages/UserListPage';
import 'bootstrap/dist/css/bootstrap.css';
import Teacher_home from './pages/Teacher_homepage';

function App() {
  return (
    <>    
      <div>
        <Routes>
      
          <Route path="/users" element={<UserListPage />} />
          <Route path="/" element={<Body />} />
          <Route path="/teacher_home" element={<Teacher_home />} />
            
        </Routes>

      </div>
    </>
  );
}

export default App;



