import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-800 font-bold text-xl"> LKB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Luit Kumar Barman</h1>
              <p className="text-xs text-blue-100">Official Website</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">{t('home')}</Link>
            <div className="relative group">
              <button className="hover:text-blue-200 transition-colors flex items-center">
                {t('services')}
              </button>
              <div className="absolute top-full left-0 w-64 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
                <Link to="/services/appointment" className="block px-4 py-3 hover:bg-gray-50 border-b">
                  {t('appointment')}
                </Link>
                <Link to="/services/grievance" className="block px-4 py-3 hover:bg-gray-50 border-b">
                  {t('grievance')}
                </Link>
                <Link to="/services/health" className="block px-4 py-3 hover:bg-gray-50 border-b">
                  {t('health')}
                </Link>
                <Link to="/services/education" className="block px-4 py-3 hover:bg-gray-50 border-b">
                  {t('education')}
                </Link>
                <Link to="/services/invitation" className="block px-4 py-3 hover:bg-gray-50">
                  Invitation Request
                </Link>
                <Link to="/services/real-estate" className="block px-4 py-3 hover:bg-gray-50">
                  Real Estate Consultancy
                </Link>
              </div>
            </div>
            <Link to="/gallery" className="hover:text-blue-200 transition-colors">{t('gallery')}</Link>
            <Link to="/resources" className="hover:text-blue-200 transition-colors">{t('resources')}</Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full right-0 w-40 bg-white text-gray-800 rounded-lg shadow-xl mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        currentLanguage === lang.code ? 'bg-blue-50 text-blue-800' : ''
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 w-48 bg-white text-gray-800 rounded-lg shadow-xl mt-2">
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-3 hover:bg-gray-50 border-b"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      User Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-3 hover:bg-gray-50 border-b text-orange-600"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 inline mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link to="/services/appointment" className="hover:text-blue-200 transition-colors pl-4" onClick={() => setIsMenuOpen(false)}>
                {t('appointment')}
              </Link>
              <Link to="/services/grievance" className="hover:text-blue-200 transition-colors pl-4" onClick={() => setIsMenuOpen(false)}>
                {t('grievance')}
              </Link>
              <Link to="/services/health" className="hover:text-blue-200 transition-colors pl-4" onClick={() => setIsMenuOpen(false)}>
                {t('health')}
              </Link>
              <Link to="/services/education" className="hover:text-blue-200 transition-colors pl-4" onClick={() => setIsMenuOpen(false)}>
                {t('education')}
              </Link>
              <Link to="/gallery" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t('gallery')}
              </Link>
              <Link to="/resources" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {t('resources')}
              </Link>
              
              {user ? (
                <>
                  <Link to="/user-dashboard" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    User Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin-dashboard" className="hover:text-orange-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-left hover:text-blue-200 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {t('login')}
                  </Link>
                  <Link to="/register" className="hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {t('register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;