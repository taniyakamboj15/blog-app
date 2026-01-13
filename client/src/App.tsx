import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import Dashboard from './pages/Dashboard';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blog/:id" element={<BlogDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
