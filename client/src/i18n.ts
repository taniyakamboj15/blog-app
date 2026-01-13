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
            "read_more": "Read More",
            "welcome_back": "Welcome back! Please enter your details.",
            "email_label": "Email Address",
            "email_placeholder": "Enter your email",
            "password_label": "Password",
            "password_placeholder": "Enter your password",
            "auth_signing_in": "Signing in...",
            "no_account": "Don't have an account?",
            "create_account_desc": "Create an account to start blogging.",
            "username_label": "Username",
            "username_placeholder": "Choose a username",
            "role_label": "Role",
            "role_author": "Author",
            "role_admin": "Admin",
            "create_account_btn": "Create Account",
            "already_have_account": "Already have an account?",
            "signup_failed": "Signup failed",
            "login_failed": "Login failed",
            "blog_title_label": "Blog Title",
            "blog_title_placeholder": "Enter an engaging title",
            "language_label": "Language",
            "content_label": "Content",
            "tags_label": "Tags (comma separated)",
            "publishing": "Publishing...",
            "publish_btn": "Publish Blog",
            "create_blog_error": "Failed to create blog",
            "blog_not_found": "Blog not found",
            "back_to_home": "Back to Home",
            "home_description": "Discover stories, thinking, and expertise from writers on any topic.",
            "dashboard_welcome": "Welcome, {{name}}",
            "dashboard_description": "Here you can manage your blogs and profile."
        }
    },
    ar: {
        translation: {
            "welcome": "مرحبًا بكم في المدونة",
            "login": "تسجيل الدخول",
            "signup": "إنشاء حساب",
            "dashboard": "لوحة التحكم",
            "create_blog": "إنشاء مدونة",
            "read_more": "اقرأ المزيد",
            "welcome_back": "مرحبًا بعودتك! الرجاء إدخال التفاصيل الخاصة بك.",
            "email_label": "البريد الإلكتروني",
            "email_placeholder": "أدخل بريدك الإلكتروني",
            "password_label": "كلمة المرور",
            "password_placeholder": "أدخل كلمة المرور",
            "auth_signing_in": "جاري تسجيل الدخول...",
            "no_account": "ليس لديك حساب؟",
            "create_account_desc": "أنشئ حسابًا لبدء التدوين.",
            "username_label": "اسم المستخدم",
            "username_placeholder": "اختر اسم مستخدم",
            "role_label": "الدور",
            "role_author": "مؤلف",
            "role_admin": "مسؤول",
            "create_account_btn": "إنشاء حساب",
            "already_have_account": "هل لديك حساب بالفعل؟",
            "signup_failed": "فشل التسجيل",
            "login_failed": "فشل تسجيل الدخول",
            "blog_title_label": "عنوان المدونة",
            "blog_title_placeholder": "أدخل عنوانًا جذابًا",
            "language_label": "اللغة",
            "content_label": "المحتوى",
            "tags_label": "الوسوم (مفصولة بفواصل)",
            "publishing": "جاري النشر...",
            "publish_btn": "نشر المدونة",
            "create_blog_error": "فشل إنشاء المدونة",
            "blog_not_found": "المدونة غير موجودة",
            "back_to_home": "العودة إلى الرئيسية",
            "home_description": "اكتشف القصص والأفكار والخبرات من الكتاب في أي موضوع.",
            "dashboard_welcome": "مرحبًا، {{name}}",
            "dashboard_description": "هنا يمكنك إدارة مدوناتك وملفك الشخصي."
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
