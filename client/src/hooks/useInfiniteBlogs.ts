import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const useInfiniteBlogs = (searchTerm: string) => {
    const { i18n } = useTranslation();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    // Reset when search term changes
    useEffect(() => {
        setBlogs([]);
        setPage(1);
        setHasMore(true);
    }, [searchTerm, i18n.language]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError('');
            try {
                // Determine if we are on a new search or language change (page 1) or scrolling (page > 1)
                // If page is 1, we might be re-fetching.
                
                const { data } = await axios.get(
                    `http://localhost:5000/api/blogs?pageNumber=${page}&language=${i18n.language}&search=${searchTerm}`
                );

                setBlogs(prev => {
                    if (page === 1) return data.blogs;
                    // Filter duplicates just in case
                    const newIds = new Set(data.blogs.map((b: any) => b._id));
                    return [...prev, ...data.blogs.filter((b: any) => !newIds.has(b._id))];
                });

                setHasMore(page < data.pages);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page, searchTerm, i18n.language]);

    return { blogs, loading, error, hasMore, setPage };
};
