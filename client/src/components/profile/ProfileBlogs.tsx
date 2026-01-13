import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Calendar, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../modals/ConfirmationModal';

const ProfileBlogs = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { t } = useTranslation();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
        isOpen: false,
        blogId: null
    });

    useEffect(() => {
        if (userInfo) {
            fetchMyBlogs();
        }
    }, [userInfo]);

    const fetchMyBlogs = async () => {
        try {
            // Fetching all blogs and filtering client-side for now as we don't have a /my-blogs endpoint yet
            // Ideally should have GET /api/blogs/my-blogs
            const { data } = await axios.get('http://localhost:5000/api/blogs');
            const myBlogs = data.blogs.filter((blog: any) => blog.author._id === userInfo?._id);
            setBlogs(myBlogs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id: string) => {
        setDeleteModal({ isOpen: true, blogId: id });
    };

    const handleDelete = async () => {
        if (!deleteModal.blogId) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${deleteModal.blogId}`, {
                withCredentials: true
            });
            setBlogs(blogs.filter(blog => blog._id !== deleteModal.blogId));
        } catch (error) {
            console.error(error);
            alert("Failed to delete blog");
        } finally {
            setDeleteModal({ isOpen: false, blogId: null });
        }
    };

    if (loading) return (
        <div className="flex justify-center py-10">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Edit size={24} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('no_blogs_yet')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Share your thoughts with the world!</p>
                </div>
                <Link
                    to="/create-blog"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl hover:from-indigo-700 hover:to-pink-700 transition-all font-bold shadow-lg shadow-indigo-600/20 hover:scale-105"
                >
                    <Plus size={18} />
                    {t('create_blog')}
                </Link>
            </div>
        );
    }

    return (
        <>
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, blogId: null })}
                onConfirm={handleDelete}
                title={t('delete_blog_title') || "Delete Blog"}
                message={t('delete_blog_confirm') || "Are you sure you want to delete this blog? This action cannot be undone."}
                confirmText={t('delete')}
                isDangerous={true}
            />

            <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {blogs.map((blog, index) => (
                    <div 
                        key={blog._id} 
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:shadow-lg hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all duration-300 relative overflow-hidden"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Hover accent */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="space-y-3 flex-grow z-10">
                            <Link to={`/blog/${blog._id}`} className="block group/link">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 transition-colors line-clamp-1 flex items-center gap-2">
                                    {blog.title}
                                    <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-gray-400" />
                                </h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                    <Calendar size={14} />
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                                {blog.tags && blog.tags.length > 0 && (
                                    <span className="text-indigo-500 dark:text-indigo-400 text-xs font-medium px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                                        #{blog.tags[0]} {blog.tags.length > 1 && `+${blog.tags.length - 1}`}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto z-10 border-t md:border-t-0 border-gray-50 dark:border-gray-700 pt-4 md:pt-0">
                            <Link
                                to={`/edit-blog/${blog._id}`}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400 transition-all text-sm font-semibold border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30"
                            >
                                <Edit size={16} />
                                {t('edit')}
                            </Link>
                            <button
                                onClick={() => confirmDelete(blog._id)}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-sm font-semibold border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                            >
                                <Trash2 size={16} />
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProfileBlogs;
