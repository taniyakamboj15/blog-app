import { useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../redux/store';
import { openAuthModal } from '../redux/slices/uiSlice';

interface LikeButtonProps {
    blogId: string;
    initialLikes: string[];
}

const LikeButton = ({ blogId, initialLikes }: LikeButtonProps) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [likes, setLikes] = useState<string[]>(initialLikes);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isLiked = userInfo ? likes.includes(userInfo._id) : false;

    const handleLike = async () => {
        if (!userInfo) {
            dispatch(openAuthModal(t('login_to_interact') as string));
            return;
        }

        // Optimistic update
        const prevLikes = [...likes];
        if (isLiked) {
            setLikes(likes.filter(id => id !== userInfo._id));
        } else {
            setLikes([...likes, userInfo._id]);
        }

        try {
            const { data } = await axios.put(
                `http://localhost:5000/api/blogs/${blogId}/like`,
                {},
                { withCredentials: true }
            );
            setLikes(data); // Sync with server
        } catch (error) {
            setLikes(prevLikes); // Revert on error
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked
                    ? 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/30 dark:hover:text-pink-400'
            }`}
        >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
            <span className="font-medium">{likes.length}</span>
            <span className="hidden sm:inline">{t('likes')}</span>
        </button>
    );
};

export default LikeButton;
