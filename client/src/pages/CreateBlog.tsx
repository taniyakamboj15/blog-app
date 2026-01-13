import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PenTool, Loader } from 'lucide-react';
import { useCreateBlog } from '../hooks/useCreateBlog';

// Custom toolbar options
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
    ],
};

const CreateBlog = () => {
    const {
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
    } = useCreateBlog();

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                        <PenTool size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('create_blog')}
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 border border-red-100 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('blog_title_label')}</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                                placeholder={t('blog_title_placeholder')}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('language_label')}</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                            >
                                <option value="en">English</option>
                                <option value="ar">Arabic</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('content_label')}</label>
                        <div className="prose-editor dark:text-white">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('tags_label')}</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-gray-900 dark:text-white"
                            placeholder="news, tech, lifestyle"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 py-3 px-8 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transform transition hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading && <Loader className="animate-spin" size={20} />}
                            {loading ? t('publishing') : t('publish_btn')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
