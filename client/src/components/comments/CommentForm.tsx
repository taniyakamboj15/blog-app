import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../redux/store';
import { openAuthModal } from '../../redux/slices/uiSlice';

interface CommentFormProps {
    blogId: string;
    parentCommentId?: string;
    onCommentAdded: (comment: any) => void;
    onCancel?: () => void;
}

const CommentForm = ({ blogId, parentCommentId, onCommentAdded, onCancel }: CommentFormProps) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userInfo) {
            dispatch(openAuthModal(t('login_to_interact') as string));
            return;
        }

        if (!content.trim()) return;

        setLoading(true);
        try {
            const { data } = await axios.post(
                `http://localhost:5000/api/blogs/${blogId}/comments`,
                { content, parentComment: parentCommentId },
                { withCredentials: true }
            );
            onCommentAdded(data);
            setContent('');
        } catch (error) {
            console.error(error);
            dispatch(openAuthModal(t('login_to_interact') as string));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className={`relative transition-all duration-300 ${!userInfo ? 'opacity-60' : ''}`}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={userInfo ? t('write_comment') : t('login_to_interact')}
                    disabled={!userInfo}
                    className="w-full p-4 pr-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-gray-900 shadow-sm focus:shadow-md transition-all resize-none min-h-[100px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                    type="submit"
                    disabled={loading || !content.trim() || !userInfo}
                    className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95"
                >
                    <Send size={18} />
                </button>
            </div>
            {onCancel && (
                <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        {t('cancel')}
                    </button>
                </div>
            )}
        </form>
    );
};

export default CommentForm;
