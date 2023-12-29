import { Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/users" element={<UserListPage />} />
      </Routes>
    </>
  );
}

export default App;
