import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ZodError } from 'zod';
import { useTranslation } from 'react-i18next';
import { setCredentials } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { loginSchema, formatZodErrors } from '../utils/validation';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Client-side validation
            const formData = { email, password };
            loginSchema.parse(formData);

            const { data } = await axios.post('http://localhost:5000/api/auth/login', formData, {
                withCredentials: true
            });

            dispatch(setCredentials(data));
            navigate('/');
        } catch (err: any) {
            if (err instanceof ZodError) {
                setError(formatZodErrors(err));
            } else {
                setError(err.response?.data?.message || t('login_failed'));
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
        t
    };
};
