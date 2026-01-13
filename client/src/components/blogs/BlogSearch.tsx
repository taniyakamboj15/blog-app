import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogSearchProps {
    value: string;
    onChange: (value: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ value, onChange }) => {
    const { t } = useTranslation();

    return (
        <div className="relative max-w-2xl mx-auto w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 dark:border-gray-800 rounded-2xl leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm group-hover:shadow-md"
                placeholder={t('search_placeholder') || "Search by title, author, or tags..."}
            />
            {/* Optional: Add a subtle 'Press / to search' hint globally later */}
        </div>
    );
};

export default BlogSearch;
