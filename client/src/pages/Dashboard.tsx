
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {t('dashboard')}
            </h1>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">{t('dashboard_welcome', { name: userInfo?.username })}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('dashboard_description')}
                </p>
                {/* TODO: List user's blogs here */}
            </div>
        </div>
    );
};

export default Dashboard;
