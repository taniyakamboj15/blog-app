import { Link } from 'react-router-dom';
import { Heart, Calendar, ArrowRight, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogCardProps {
    blog: {
        _id: string;
        title: string;
        content: string;
        author: {
            username: string;
        };
        createdAt: string;
        likes: string[];
        tags?: string[];
    };
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const { t } = useTranslation();

    // Strip HTML tags for preview
    const createPreview = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <div className="group h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col overflow-hidden relative">
            {/* Top accent gradient - visible on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="p-6 flex flex-col flex-grow">
                {/* Header: Author & Date */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-50 dark:border-indigo-900/50">
                            {blog.author.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            {blog.author.username}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                        <Calendar size={12} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Title */}
                <Link to={`/blog/${blog._id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-300 line-clamp-2">
                        {blog.title}
                    </h3>
                </Link>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300"
                            >
                                <Tag size={10} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content Preview */}
                <div className="mb-6 flex-grow">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {createPreview(blog.content)}
                    </p>
                </div>

                {/* Footer: Likes & Link */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm group-hover:text-pink-600 transition-colors">
                        <Heart size={16} className={blog.likes?.length > 0 ? "fill-pink-600 text-pink-600" : ""} />
                        <span className="font-medium">{blog.likes?.length || 0}</span>
                    </div>

                    <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                    >
                        {t('read_more')}
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
