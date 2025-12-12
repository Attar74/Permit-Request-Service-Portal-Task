import { useRTL } from './useRTL';

type TranslationKey =
  | 'Home'
  | 'Apply'
  | 'Open menu'
  | 'Close drawer'
  | 'Open drawer'
  | 'Switch to light mode'
  | 'Switch to dark mode'
  | 'Switch language'
  | 'Permit Request Portal'
  | 'Portal'
  | 'Permit Request Service Portal'
  | 'View all permit applications below'
  | 'Permit Applications'
  | 'applications'
  | 'application'
  | 'found'
  | 'List View'
  | 'Grid View'
  | 'List'
  | 'Grid'
  | 'Loading applications...'
  | 'Please wait while we fetch your data'
  | 'Error loading applications'
  | 'No permit applications found'
  | 'Get started by submitting your first permit application.'
  | 'Apply for a Permit'
  | 'ID'
  | 'Applicant Name'
  | 'Email'
  | 'Permit Type'
  | 'Status'
  | 'Submitted At'
  | 'Application'
  | 'Applicant'
  | 'Apply for a Permit'
  | 'Fill out the form below to submit your permit application'
  | 'Email Address'
  | 'Enter your full name'
  | 'Enter your email address'
  | 'e.g., Construction Permit, Business License'
  | 'Applicant name is required'
  | 'Email address is required'
  | 'Please enter a valid email address'
  | 'Permit type is required'
  | 'Submitting...'
  | 'Submit Application'
  | 'Failed to submit application. Please try again.';

const translations = {
  en: {
    Home: 'Home',
    Apply: 'Apply',
    'Open menu': 'Open menu',
    'Close drawer': 'Close drawer',
    'Open drawer': 'Open drawer',
    'Switch to light mode': 'Switch to light mode',
    'Switch to dark mode': 'Switch to dark mode',
    'Switch language': 'Switch language',
    'Permit Request Portal': 'Permit Request Portal',
    Portal: 'Portal',
    'Permit Request Service Portal': 'Permit Request Service Portal',
    'View all permit applications below': 'View all permit applications below',
    'Permit Applications': 'Permit Applications',
    applications: 'applications',
    application: 'application',
    found: 'found',
    'List View': 'List View',
    'Grid View': 'Grid View',
    List: 'List',
    Grid: 'Grid',
    'Loading applications...': 'Loading applications...',
    'Please wait while we fetch your data': 'Please wait while we fetch your data',
    'Error loading applications': 'Error loading applications',
    'No permit applications found': 'No permit applications found',
    'Get started by submitting your first permit application.':
      'Get started by submitting your first permit application.',
    'Apply for a Permit': 'Apply for a Permit',
    ID: 'ID',
    'Applicant Name': 'Applicant Name',
    Email: 'Email',
    'Permit Type': 'Permit Type',
    Status: 'Status',
    'Submitted At': 'Submitted At',
    Application: 'Application',
    Applicant: 'Applicant',
    'Fill out the form below to submit your permit application':
      'Fill out the form below to submit your permit application',
    'Email Address': 'Email Address',
    'Enter your full name': 'Enter your full name',
    'Enter your email address': 'Enter your email address',
    'e.g., Construction Permit, Business License':
      'e.g., Construction Permit, Business License',
    'Applicant name is required': 'Applicant name is required',
    'Email address is required': 'Email address is required',
    'Please enter a valid email address': 'Please enter a valid email address',
    'Permit type is required': 'Permit type is required',
    'Submitting...': 'Submitting...',
    'Submit Application': 'Submit Application',
    'Failed to submit application. Please try again.':
      'Failed to submit application. Please try again.',
  },
  ar: {
    Home: 'الرئيسية',
    Apply: 'تقديم طلب',
    'Open menu': 'فتح القائمة',
    'Close drawer': 'إغلاق الدرج',
    'Open drawer': 'فتح الدرج',
    'Switch to light mode': 'التبديل إلى الوضع الفاتح',
    'Switch to dark mode': 'التبديل إلى الوضع الداكن',
    'Switch language': 'تبديل اللغة',
    'Permit Request Portal': 'بوابة طلبات التصاريح',
    Portal: 'البوابة',
    'Permit Request Service Portal': 'بوابة خدمة طلبات التصاريح',
    'View all permit applications below': 'عرض جميع طلبات التصاريح أدناه',
    'Permit Applications': 'طلبات التصاريح',
    applications: 'طلبات',
    application: 'طلب',
    found: 'موجود',
    'List View': 'عرض القائمة',
    'Grid View': 'عرض الشبكة',
    List: 'قائمة',
    Grid: 'شبكة',
    'Loading applications...': 'جاري تحميل الطلبات...',
    'Please wait while we fetch your data': 'يرجى الانتظار أثناء جلب البيانات',
    'Error loading applications': 'خطأ في تحميل الطلبات',
    'No permit applications found': 'لم يتم العثور على طلبات تصاريح',
    'Get started by submitting your first permit application.':
      'ابدأ بتقديم طلب التصريح الأول الخاص بك.',
    'Apply for a Permit': 'تقديم طلب تصريح',
    ID: 'المعرف',
    'Applicant Name': 'اسم مقدم الطلب',
    Email: 'البريد الإلكتروني',
    'Permit Type': 'نوع التصريح',
    Status: 'الحالة',
    'Submitted At': 'تاريخ التقديم',
    Application: 'الطلب',
    Applicant: 'مقدم الطلب',
    'Fill out the form below to submit your permit application':
      'املأ النموذج أدناه لتقديم طلب التصريح الخاص بك',
    'Email Address': 'عنوان البريد الإلكتروني',
    'Enter your full name': 'أدخل اسمك الكامل',
    'Enter your email address': 'أدخل عنوان بريدك الإلكتروني',
    'e.g., Construction Permit, Business License':
      'مثال: تصريح بناء، ترخيص تجاري',
    'Applicant name is required': 'اسم مقدم الطلب مطلوب',
    'Email address is required': 'عنوان البريد الإلكتروني مطلوب',
    'Please enter a valid email address': 'يرجى إدخال عنوان بريد إلكتروني صالح',
    'Permit type is required': 'نوع التصريح مطلوب',
    'Submitting...': 'جاري الإرسال...',
    'Submit Application': 'إرسال الطلب',
    'Failed to submit application. Please try again.':
      'فشل إرسال الطلب. يرجى المحاولة مرة أخرى.',
  },
};

export const useTranslations = () => {
  const { locale } = useRTL();

  const t = (key: TranslationKey): string => {
    return translations[locale.value][key] || key;
  };

  return { t };
};

