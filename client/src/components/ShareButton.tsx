import { Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ShareButton = () => {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    const handleShare = async () => {
        const url = window.location.href;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: url
                });
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all"
        >
            {copied ? <Check size={20} /> : <Share2 size={20} />}
            <span className="hidden sm:inline">{copied ? t('share_success') : t('share')}</span>
        </button>
    );
};

export default ShareButton;
