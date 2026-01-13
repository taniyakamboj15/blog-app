import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import BlogSearch from '../components/blogs/BlogSearch';
import useDebounce from '../hooks/useDebounce';
import { useInfiniteBlogs } from '../hooks/useInfiniteBlogs';

const Blogs = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);
    const { blogs, loading, hasMore, setPage } = useInfiniteBlogs(debouncedSearch);

    // Infinite Scroll Observer
    const observer = useRef<IntersectionObserver | null>(null);
    const lastBlogElementRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-500">
            {/* Header & Search */}
            <div className="space-y-8 text-center max-w-3xl mx-auto">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
                        {t('explore_stories') || "Explore Stories"}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {t('explore_description') || "Discover the latest vlogs, trends, and creative ideas from our community."}
                    </p>
                </div>
                
                <BlogSearch value={searchTerm} onChange={setSearchTerm} />
            </div>

            {/* Results Grid */}
            <div className="space-y-8">
                {blogs.length === 0 && !loading ? (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                         <p className="text-gray-500 dark:text-gray-400 text-lg">
                            {searchTerm 
                                ? `${t('no_stories_found') || "No stories found related to"} "${searchTerm}"` 
                                : (t('no_stories_yet') || "No stories yet. Be the first to write one!")
                            }
                         </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog, index) => {
                            if (blogs.length === index + 1) {
                                return (
                                    <div ref={lastBlogElementRef} key={blog._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        <BlogCard blog={blog} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={blog._id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        <BlogCard blog={blog} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}
                
                {loading && (
                    <div className="flex justify-center py-12">
                        <Loader className="animate-spin text-indigo-600" size={32} />
                    </div>
                )}
                
                {!hasMore && blogs.length > 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">{t('end_of_list') || "You've reached the end of the list."}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
