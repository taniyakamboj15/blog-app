import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { Menu, X, User, LogOut, Globe, PenTool, Compass } from 'lucide-react';
import axios from 'axios'; // We will move this to service later

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                B
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
                                BlogApp
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Toggle Language"
                        >
                            <Globe size={20} />
                        </button>

                        <Link
                            to="/blogs"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Compass size={20} />
                            <span className="font-medium">{t('nav_explore')}</span>
                        </Link>

                        {userInfo ? (
                            <>
                                {(userInfo.role === 'admin' || userInfo.role === 'author') && (
                                    <Link
                                        to="/create-blog"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 transition-colors"
                                    >
                                        <PenTool size={18} />
                                        <span>{t('create_blog')}</span>
                                    </Link>
                                )}
                                <div className="relative group">
                                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                                        <User size={20} />
                                        <span>{userInfo.username}</span>
                                    </Link>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                                >
                                    {t('login')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:opacity-90 transition-opacity font-medium shadow-lg shadow-indigo-500/20"
                                >
                                    {t('signup')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                        >
                            <Globe size={20} />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-4 duration-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/blogs"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <Compass size={20} />
                            <span>{t('nav_explore')}</span>
                        </Link>
                        {userInfo ? (
                            <>
                                <div className="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200">
                                    Hello, {userInfo.username}
                                </div>
                                {(userInfo.role === 'admin' || userInfo.role === 'author') && (
                                    <Link
                                        to="/create-blog"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('create_blog')}
                                    </Link>
                                )}
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('login')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('signup')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
