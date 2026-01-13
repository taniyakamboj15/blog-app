import { useState } from 'react';
import { User, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileBlogs from '../components/profile/ProfileBlogs';

const Profile = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'info' | 'blogs'>('info');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white px-4 md:px-0">
                {t('dashboard')}
            </h1>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mx-4 md:mx-0">
                <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'info'
                            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <User size={18} />
                    {t('profile_info')}
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === 'blogs'
                            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    <FileText size={18} />
                    {t('my_blogs')}
                </button>
            </div>

            <div className="px-4 md:px-0">
                {activeTab === 'info' ? <ProfileInfo /> : <ProfileBlogs />}
            </div>
        </div>
    );
};

export default Profile;
