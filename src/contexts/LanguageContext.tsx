import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'as' | 'hi';

interface LanguageContent {
  [key: string]: {
    en: string;
    as: string;
    hi: string;
  };
}

const defaultContent: LanguageContent = {
  'home': { en: 'Home', as: 'ঘর', hi: 'होम' },
  'about': { en: 'About', as: 'আমাৰ বিষয়ে', hi: 'हमारे बारे में' },
  'services': { en: 'Services', as: 'সেৱাসমূহ', hi: 'सेवाएं' },
  'gallery': { en: 'Gallery', as: 'গেলাৰী', hi: 'गैलरी' },
  'resources': { en: 'Resources', as: 'সম্পদসমূহ', hi: 'संसाधन' },
  'contact': { en: 'Contact', as: 'যোগাযোগ', hi: 'संपर्क' },
  'login': { en: 'Login', as: 'লগইন', hi: 'लॉगिन' },
  'register': { en: 'Register', as: 'নিবন্ধন', hi: 'रजिस्टर' },
  'dashboard': { en: 'Dashboard', as: 'ডেছবৰ্ড', hi: 'डैशबोर्ड' },
  'appointment': { en: 'Appointment Booking', as: 'নিযুক্তি বুকিং', hi: 'अपॉइंटमेंट बुकिंग' },
  'grievance': { en: 'Public Grievance', as: 'জনসাধাৰণৰ অভিযোগ', hi: 'जन शिकायत' },
  'health': { en: 'Health Support', as: 'স্বাস্থ্য সহায়তা', hi: 'स्वास्थ्य सहायता' },
  'education': { en: 'Education Support', as: 'শিক্ষা সহায়তা', hi: 'शिक्षा सहायता' },
  'aboutTitle': { en: 'About Me', as: 'মোৰ বিষয়ে', hi: 'मेरे बारे में' },
  'missionTitle': { en: 'My Mission', as: 'মোৰ লক্ষ্য', hi: 'मेरा मिशन' },
  'socialMediaTitle': { en: 'Follow Us', as: 'আমাক অনুসৰণ কৰক', hi: 'हमें फॉलो करें' },
  'newsTitle': { en: 'Latest News', as: 'শেহতীয়া বাতৰি', hi: 'ताजा समाचार' },
  'videosTitle': { en: 'Video News', as: 'ভিডিঅ\' বাতৰি', hi: 'वीडियो समाचार' },
  'podcastsTitle': { en: 'Podcasts', as: 'পডকাস্ট', hi: 'पॉडकास्ट' },
  'galleryTitle': { en: 'Photo Gallery', as: 'ফটো গেলাৰী', hi: 'फोटो गैलरी' },
  'viewAll': { en: 'View All', as: 'সকলো চাওক', hi: 'सभी देखें' },
  'quickLinks': { en: 'Quick Links', as: 'দ্ৰুত লিংক', hi: 'त्वरित लिंक' },
  'followUs': { en: 'Follow Us', as: 'আমাক অনুসৰণ কৰক', hi: 'हमें फॉलो करें' }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  content: LanguageContent;
  updateContent: (key: string, translations: { en: string; as: string; hi: string }) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [content, setContent] = useState<LanguageContent>(defaultContent);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return content[key]?.[currentLanguage] || key;
  };

  const updateContent = (key: string, translations: { en: string; as: string; hi: string }) => {
    setContent(prev => ({
      ...prev,
      [key]: translations
    }));
  };

  React.useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const value = {
    currentLanguage,
    setLanguage,
    t,
    content,
    updateContent
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};