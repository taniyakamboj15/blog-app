import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Loader, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
        t
    } = useLogin();

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)] animate-in fade-in zoom-in-95 duration-500 py-12">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

                <div className="text-center mb-10 relative">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-2">
                        {t('login')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">{t('welcome_back')}</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-100 dark:border-red-900/50 flex items-center gap-2 animate-in slide-in-from-top-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6 relative">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{t('email_label')}</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                                placeholder={t('email_placeholder')}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{t('password_label')}</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-14 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                                placeholder={t('password_placeholder')}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-2"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : (
                            <>
                                {t('login')}
                                <ArrowRight size={20} className="ml-1" />
                            </>
                        )}
                        {loading && t('auth_signing_in')}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    {t('no_account')}{' '}
                    <Link to="/signup" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 hover:underline decoration-indigo-500/30 underline-offset-4">
                        {t('signup')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
