import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useCreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [language, setLanguage] = useState('en');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const tagsArray = tags.split(',').map(tag => tag.trim());

            await axios.post('http://localhost:5000/api/blogs', {
                title,
                content,
                language,
                tags: tagsArray
            }, { withCredentials: true });

            navigate('/'); 
        } catch (err: any) {
            setError(err.response?.data?.message || t('create_blog_error'));
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        language,
        setLanguage,
        tags,
        setTags,
        loading,
        error,
        handleSubmit,
        t
    };
};
