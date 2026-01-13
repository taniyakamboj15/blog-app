import { X, LogIn, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type RootState } from '../../redux/store';
import { closeAuthModal } from '../../redux/slices/uiSlice';

const AuthModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isAuthModalOpen, authModalMessage } = useSelector((state: RootState) => state.ui);

    if (!isAuthModalOpen) return null;

    const handleNavigation = (path: string) => {
        dispatch(closeAuthModal());
        navigate(path);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={() => dispatch(closeAuthModal())}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-800">
                <button 
                    onClick={() => dispatch(closeAuthModal())}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                        <LogIn size={32} />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('auth_modal_title')}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {authModalMessage || t('auth_modal_desc')}
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <button
                            onClick={() => handleNavigation('/login')}
                            className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <LogIn size={20} />
                            {t('login')}
                        </button>

                        <button
                            onClick={() => handleNavigation('/signup')}
                            className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-white font-semibold border-2 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:-translate-y-0.5"
                        >
                            <UserPlus size={20} />
                            {t('create_account_btn')}
                        </button>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 text-center">
                    <p className="text-xs text-gray-400">
                        {t('auth_modal_footer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
