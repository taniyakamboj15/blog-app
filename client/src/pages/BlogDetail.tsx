import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useBlogDetail } from '../hooks/useBlogDetail';
import LikeButton from '../components/LikeButton';
import ShareButton from '../components/ShareButton';
import CommentSection from '../components/comments/CommentSection';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import axios from 'axios';

const BlogDetail = () => {
    const { blog, loading, t } = useBlogDetail();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!blog) {
        return <div className="text-center py-20 text-gray-500">{t('blog_not_found')}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                {t('back_to_home')}
            </Link>

            <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-8 md:p-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <User size={16} />
                            {blog.author.username}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <Calendar size={16} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        {blog.tags.map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                                <Tag size={14} />
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            {blog.title}
                        </h1>
                        {userInfo && (userInfo._id === blog.author._id || userInfo.role === 'admin') && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-blog/${blog._id}`}
                                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                                    title={t('edit')}
                                >
                                    <Edit size={20} />
                                </Link>
                                <button
                                    onClick={async () => {
                                        if (confirm(t('delete_confirm'))) {
                                            try {
                                                await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`, { withCredentials: true });
                                                navigate('/');
                                            } catch (e) {
                                                alert('Failed to delete');
                                            }
                                        }
                                    }}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                    title={t('delete')}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="flex items-center justify-between py-8 border-t border-gray-100 dark:border-gray-800 mt-8">
                        <LikeButton blogId={blog._id} initialLikes={blog.likes || []} />
                        <ShareButton />
                    </div>

                    <CommentSection blogId={blog._id} />
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
