import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Loader, Trash2, Mail, User as UserIcon, Shield } from 'lucide-react';
import ConfirmationModal from '../modals/ConfirmationModal';

interface UserData {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
}

const UserList = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const fetchUsers = async (pageNumber = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/auth/users?pageNumber=${pageNumber}`, {
                withCredentials: true
            });
            setUsers(data.users);
            setPages(data.pages);
            setTotal(data.total);
            setPage(data.page);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleDelete = async () => {
        if (!userToDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/auth/users/${userToDelete}`, {
                withCredentials: true
            });
            setUsers(users.filter(user => user._id !== userToDelete));
            setUserToDelete(null);
            // Refetch to update pagination if needed, or simply decrement total
            setTotal(prev => prev - 1);
        } catch (error) {
            console.error('Failed to delete user', error);
            alert('Failed to delete user');
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Loader className="animate-spin text-indigo-600" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ConfirmationModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleDelete}
                title={t('delete_user_title') || "Delete User?"}
                message={t('delete_user_confirm') || "Are you sure you want to delete this user? This action cannot be undone."}
                confirmText={t('delete')}
                isDangerous={true}
            />

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield className="text-indigo-600" size={24} />
                        {t('users_management') || "User Management"}
                        <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {total}
                        </span>
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4">{t('username_label')}</th>
                                <th className="px-6 py-4">{t('email_label')}</th>
                                <th className="px-6 py-4">{t('role_label')}</th>
                                <th className="px-6 py-4 text-right">{t('delete')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {users.map((user) => (
                                <tr key={user._id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                                                {user.username.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {user.username}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <Mail size={14} />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => setUserToDelete(user._id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pages > 1 && (
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center gap-2">
                        {Array.from({ length: pages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                    page === i + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
