import { Routes, Route } from 'react-router-dom';
import Body from './pages/homepage';
import UserListPage from './pages/UserListPage';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
    <div style={{  
  backgroundImage: "url(" + "https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '700px'}}>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/" element={<Body />} />
      </Routes>
      </div>
    </>
  );
}

export default App;



