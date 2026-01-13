import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentSectionProps {
    blogId: string;
}

const CommentSection = ({ blogId }: CommentSectionProps) => {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(3);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/blogs/${blogId}/comments`);
                setComments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [blogId]);

    const handleCommentAdded = (newComment: any) => {
        setComments(prev => [newComment, ...prev]);
        setVisibleCount(prev => prev + 1); // Ensure new comment is visible
    };

    const rootComments = comments.filter(c => !c.parentComment);
    const visibleRootComments = rootComments.slice(0, visibleCount);
    const hasMore = rootComments.length > visibleCount;

    const showMore = () => {
        setVisibleCount(prev => Math.min(prev + 5, rootComments.length));
    };

    const showLess = () => {
        setVisibleCount(3);
    };

    return (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('comments')} ({comments.length})
                </h3>
            </div>

            <CommentForm blogId={blogId} onCommentAdded={handleCommentAdded} />

            <div className="space-y-4 mt-6">
                {loading ? (
                    <div className="text-center text-gray-500 py-4">Loading comments...</div>
                ) : rootComments.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <MessageSquare className="mx-auto mb-2 opacity-50" size={24} />
                        <p className="text-sm">{t('write_comment')}</p>
                    </div>
                ) : (
                    <>
                        {visibleRootComments.map(comment => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                allComments={comments}
                                blogId={blogId}
                                onCommentAdded={handleCommentAdded}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* Pagination Controls */}
            {rootComments.length > 3 && (
                <div className="flex flex-col items-center gap-2 pt-4">
                    {hasMore ? (
                        <button
                            onClick={showMore}
                            className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-900/10 px-4 py-2 rounded-full"
                        >
                            <span>{t('show_more_comments')}</span>
                            <ChevronDown size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={showLess}
                            className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-4 py-2"
                        >
                            <span>{t('show_less_comments')}</span>
                            <ChevronUp size={16} />
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default CommentSection;
