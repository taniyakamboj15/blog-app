import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        username: string;
    };
    tags: string[];
    createdAt: string;
    language: string;
    likes: string[];
}

export const useBlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    return {
        blog,
        loading,
        t
    };
};
