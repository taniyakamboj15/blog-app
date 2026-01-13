import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    isDangerous = true,
}) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-800">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center space-y-6">
                    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${isDangerous ? 'bg-red-500 shadow-red-500/30' : 'bg-indigo-500 shadow-indigo-500/30'}`}>
                        <AlertTriangle size={32} />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {message}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 px-6 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-white font-semibold border-2 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:-translate-y-0.5"
                        >
                            {cancelText || t('cancel')}
                        </button>
                        
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 py-3.5 px-6 rounded-xl text-white font-semibold transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${isDangerous ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'}`}
                        >
                            {confirmText || t('confirm')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
