
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-500">
                <Outlet />
            </main>
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} BlogApp. All rights reserved.
            </footer>
        </div>
    );
};

export default MainLayout;
