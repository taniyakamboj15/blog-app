import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        username: string;
    };
    createdAt: string;
}

const Home = () => {
    const { t, i18n } = useTranslation();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5000/api/blogs?language=${i18n.language}`);
                setBlogs(data.blogs);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [i18n.language]);

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {t('welcome')}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {t('home_description')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden group">
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                                        {blog.author.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{blog.author.username}</span>
                                    <span>•</span>
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                    <Link to={`/blog/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                </h3>
                                <div
                                    className="text-gray-600 dark:text-gray-300 line-clamp-3 prose dark:prose-invert text-sm"
                                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }}
                                />
                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline mt-2"
                                >
                                    {t('read_more')} →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
