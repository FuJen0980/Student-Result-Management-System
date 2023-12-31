import { Routes, Route } from 'react-router-dom';
import Body from './pages/homepage';
import UserListPage from './pages/UserListPage';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
    <div>
      <Routes>
          
        <Route path="/users" element={<UserListPage />} />
        {/* <Route path="/" element={<Body />} /> */}
        </Routes>
        <Body/>
      </div>
    </>
  );
}

export default App;



