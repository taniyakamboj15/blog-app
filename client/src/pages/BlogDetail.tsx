import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { useBlogDetail } from '../hooks/useBlogDetail';

const BlogDetail = () => {
    const { blog, loading, t } = useBlogDetail();

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

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        {blog.title}
                    </h1>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
