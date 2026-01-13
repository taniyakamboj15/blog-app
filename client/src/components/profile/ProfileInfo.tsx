import { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, Edit, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setError } from '../../redux/slices/authSlice';
import { type RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const ProfileInfo = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (userInfo) {
            setFormData(prev => ({
                ...prev,
                username: userInfo.username,
                email: userInfo.email
            }));
        }
    }, [userInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const { data } = await axios.put(
                'http://localhost:5000/api/auth/profile',
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password || undefined
                },
                { withCredentials: true }
            );

            dispatch(setCredentials(data));
            setIsEditing(false);
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            alert(t('profile_updated_success') || "Profile updated successfully");
        } catch (error: any) {
            console.error(error);
            dispatch(setError(error.response?.data?.message || 'Update failed'));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
             {/* Decorative background blur */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
             
            <div className="relative flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    {t('profile_info')}
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-sm font-medium"
                >
                    <Edit size={16} />
                    {isEditing ? t('cancel') : t('edit_profile')}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl relative">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <User size={16} className="text-indigo-500" />
                            {t('username_label')}
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Mail size={16} className="text-pink-500" />
                            {t('email_label')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="animate-in fade-in slide-in-from-top-4 space-y-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Lock size={16} className="text-indigo-500" />
                                    {t('password_label')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={t('leave_blank_keep') || "Leave blank to keep current"}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-900 dark:text-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Lock size={16} className="text-pink-500" />
                                    {t('confirm_password') || "Confirm Password"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ml-auto"
                        >
                            <Save size={18} />
                            {t('save_changes') || "Save Changes"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileInfo;
