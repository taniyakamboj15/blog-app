import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PenTool, ArrowRight, Loader, Compass } from 'lucide-react';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import BlogCard from '../components/BlogCard';

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        username: string;
    };
    createdAt: string;
    likes: string[];
    tags?: string[];
}

const Home = () => {
    const { t, i18n } = useTranslation();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                // Fetch only page 1 (latest 10)
                const { data } = await axios.get(`http://localhost:5000/api/blogs?pageNumber=1&language=${i18n.language}`);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-2xl animate-in fade-in slide-in-from-top-8 duration-700">
                {/* Abstract Patterns */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500 blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-3xl mix-blend-screen" />
                </div>

                <div className="relative px-8 py-20 md:py-32 text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium animate-in zoom-in duration-500 delay-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>{t('welcome')}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Connect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Share.</span> Inspire.
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        {t('home_description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        {userInfo ? (
                            <Link
                                to="/create-blog"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-indigo-900 font-bold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl shadow-white/10 flex items-center justify-center gap-2 group"
                            >
                                <PenTool size={20} />
                                {t('create_blog')}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
                            >
                                {t('signup')}
                                <ArrowRight size={20} />
                            </Link>
                        )}
                        <Link 
                             to="/blogs" 
                             className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm border border-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Compass size={20} />
                            {t('read_more') || "Explore All Stories"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Blogs Section */}
            <section id="latest-blogs" className="space-y-8 scroll-mt-32">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-8 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full" />
                        {t('latest_stories') || "Latest Stories"}
                    </h2>
                    <Link to="/blogs" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                        {t('view_all') || "View All"} <ArrowRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <Loader size={40} className="text-indigo-600 animate-spin mb-4" />
                        <p className="text-gray-500 animate-pulse">{t('fetching_stories') || "Fetching amazing stories..."}</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog, index) => (
                            <div 
                                key={blog._id} 
                                className="animate-in fade-in slide-in-from-bottom-8 duration-700" 
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && blogs.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('no_stories_yet') || "No stories yet. Be the first to write one!"}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
