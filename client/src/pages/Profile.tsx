import { useState } from 'react';
import { User, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileBlogs from '../components/profile/ProfileBlogs';
import UserList from '../components/profile/UserList';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';

const Profile = () => {
    const { t } = useTranslation();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState<'info' | 'blogs' | 'users'>('info');

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 px-4 md:px-0">
                {t('dashboard')}
            </h1>

            {/* Tabs */}
            <div className="flex p-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mx-4 md:px-0 relative">
                <div 
                    className={`absolute h-[calc(100%-12px)] top-1.5 bg-white dark:bg-gray-700 rounded-xl shadow-sm transition-all duration-300 ease-in-out ${
                        userInfo?.role === 'admin' ? 'w-[calc(33.33%-8px)]' : 'w-[calc(50%-6px)]'
                    } ${
                        activeTab === 'info' ? 'translate-x-0' :
                        activeTab === 'blogs' ? (userInfo?.role === 'admin' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-[calc(100%+6px)]') :
                        'translate-x-[calc(200%+16px)]'
                    }`}
                />
                
                <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${
                        activeTab === 'info'
                            ? 'text-indigo-600 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <User size={18} />
                    {t('profile_info')}
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${
                        activeTab === 'blogs'
                            ? 'text-indigo-600 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <FileText size={18} />
                    {t('my_blogs')}
                </button>
                
                {userInfo?.role === 'admin' && (
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${
                            activeTab === 'users'
                                ? 'text-indigo-600 dark:text-white'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                    >
                        <User size={18} />
                        {t('users_tab') || "Users"}
                    </button>
                )}
            </div>

            <div className="px-4 md:px-0">
                {activeTab === 'info' && <ProfileInfo />}
                {activeTab === 'blogs' && <ProfileBlogs />}
                {activeTab === 'users' && <UserList />}
            </div>
        </div>
    );
};

export default Profile;
