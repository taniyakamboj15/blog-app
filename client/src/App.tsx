import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import Profile from './pages/Profile';
import BlogDetail from './pages/BlogDetail';
import AuthModal from './components/modals/AuthModal';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <>
      <AuthModal />
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="create-blog" element={<CreateBlog />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}

        <Route path="dashboard" element={<Profile />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="edit-blog/:id" element={<EditBlog />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
