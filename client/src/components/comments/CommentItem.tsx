import { useState } from 'react';
import { User, Reply, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { type RootState } from '../../redux/store';
import CommentForm from './CommentForm';
import ConfirmationModal from '../modals/ConfirmationModal';

interface CommentProps {
    comment: any;
    allComments: any[];
    blogId: string;
    onCommentAdded: (comment: any) => void;
    depth?: number;
    blogAuthorId?: string;
}

const CommentItem = ({ comment, allComments, blogId, onCommentAdded, depth = 0, blogAuthorId }: CommentProps) => {
    const [replying, setReplying] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const replies = allComments.filter(c => c.parentComment === comment._id);

    const handleReplyAdded = (newComment: any) => {
        onCommentAdded(newComment);
        setReplying(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${blogId}/comments/${comment._id}`, {
                withCredentials: true
            });
            // Reload to refresh comments - in a real app better state management is preferred
            window.location.reload(); 
        } catch (error) {
            console.error(error);
            alert("Failed to delete comment");
        }
    };

    // Allow delete if:
    // 1. User is admin
    // 2. User is the author of the comment
    // 3. User is the author of the BLOG
    const canDelete = userInfo && (
        userInfo.role === 'admin' || 
        userInfo._id === comment.author?._id || 
        (blogAuthorId && userInfo._id === blogAuthorId)
    );

    return (
        <>
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title={t('delete_comment_title') || "Delete Comment"}
                message={t('delete_comment_confirm') || "Are you sure you want to delete this comment?"}
                confirmText={t('delete')}
                isDangerous={true}
            />

            <div className={`group ${depth > 0 ? 'mt-3' : ''}`}>
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold border border-white dark:border-gray-900 shadow-sm text-xs">
                            {comment.author?.username?.charAt(0).toUpperCase() || <User size={14} />}
                        </div>
                    </div>
                    <div className="flex-grow min-w-0">
                        <div className="relative group/modal">
                            <div className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-2xl rounded-tl-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                                 <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-xs">
                                            @{comment.author?.username || 'Unknown'}
                                        </h4>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {canDelete && (
                                        <button 
                                            onClick={() => setShowDeleteModal(true)}
                                            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title={t('delete')}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed break-words">
                                    {comment.content}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-1 ml-2">
                                <button
                                    onClick={() => setReplying(!replying)}
                                    className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg transition-all ${
                                        replying 
                                            ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20' 
                                            : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <Reply size={12} className={replying ? "fill-current" : ""} />
                                    {t('reply')}
                                </button>
                            </div>
                        </div>

                        {replying && (
                            <div className="mt-3 ml-2 border-l-2 border-indigo-100 dark:border-gray-700 pl-3">
                                <CommentForm
                                    blogId={blogId}
                                    parentCommentId={comment._id}
                                    onCommentAdded={handleReplyAdded}
                                    onCancel={() => setReplying(false)}
                                />
                            </div>
                        )}

                        {replies.length > 0 && (
                            <div className="space-y-3 mt-3 relative">
                                <div className="absolute left-[-24px] top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-700" />
                                {replies.map(reply => (
                                    <CommentItem
                                        key={reply._id}
                                        comment={reply}
                                        allComments={allComments}
                                        blogId={blogId}
                                        onCommentAdded={onCommentAdded}
                                        depth={depth + 1}
                                        blogAuthorId={blogAuthorId}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentItem;
