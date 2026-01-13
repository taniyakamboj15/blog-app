import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const ProfileBlogs = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { t, i18n } = useTranslation();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id: string) => {
        if (window.confirm(t('delete_confirm'))) {
            try {
                await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                    withCredentials: true
                });
                setBlogs(blogs.filter(blog => blog._id !== id));
                alert(t('blog_deleted'));
            } catch (error) {
                console.error(error);
                alert("Failed to delete blog");
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    if (blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Edit size={24} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('no_blogs_yet')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Share your thoughts with the world!</p>
                </div>
                <Link
                    to="/create-blog"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-medium shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={18} />
                    {t('create_blog')}
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {blogs.map(blog => (
                <div key={blog._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:shadow-md transition-all">
                    <div className="space-y-2 flex-grow">
                        <Link to={`/blog/${blog._id}`} className="block">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                {blog.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium">
                                {blog.language === 'en' ? 'English' : 'العربية'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Link
                            to={`/edit-blog/${blog._id}`} // We will create this route
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                            <Edit size={16} />
                            {t('edit')}
                        </Link>
                        <button
                            onClick={() => handleDelete(blog._id)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm font-medium"
                        >
                            <Trash2 size={16} />
                            {t('delete')}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileBlogs;
