import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
    en: {
        translation: {
            "welcome": "Welcome to the Blog",
            "login": "Login",
            "signup": "Sign Up",
            "dashboard": "Dashboard",
            "create_blog": "Create Blog",
            "read_more": "Read More"
        }
    },
    ar: {
        translation: {
            "welcome": "مرحبًا بكم في المدونة",
            "login": "تسجيل الدخول",
            "signup": "إنشاء حساب",
            "dashboard": "لوحة التحكم",
            "create_blog": "إنشاء مدونة",
            "read_more": "اقرأ المزيد"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
