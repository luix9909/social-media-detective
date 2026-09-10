import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';

function Navigation({ darkMode, setDarkMode }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'tr', name: 'Türkçe' }
  ];

  return (
    <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <span className="text-2xl">🔍</span>
            <span className="font-bold text-lg hidden sm:inline">{t('app.title')}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className={`hover:text-purple-400 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => navigate('/history')}
              className={`hover:text-purple-400 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {t('nav.history')}
            </button>
            <button
              onClick={() => navigate('/about')}
              className={`hover:text-purple-400 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {t('nav.about')}
            </button>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className={`flex items-center gap-2 hover:text-purple-400 transition ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Globe className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">{i18n.language.toUpperCase()}</span>
              </button>
              <div className={`absolute right-0 mt-0 w-40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-purple-500 ${i18n.language === lang.code ? 'bg-purple-600' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden pb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <button onClick={() => { navigate('/'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-500">
              {t('nav.home')}
            </button>
            <button onClick={() => { navigate('/history'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-500">
              {t('nav.history')}
            </button>
            <button onClick={() => { navigate('/about'); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-purple-500">
              {t('nav.about')}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
