import React from 'react';
import { useTranslation } from 'react-i18next';

function SettingsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">{t('nav.settings')}</h1>

        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('settings.language')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { code: 'ar', name: 'العربية' },
              { code: 'en', name: 'English' },
              { code: 'fr', name: 'Français' },
              { code: 'es', name: 'Español' },
              { code: 'tr', name: 'Türkçe' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition ${
                  i18n.language === lang.code
                    ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-purple-500'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('settings.about')}</h2>
          <p className="text-gray-300 mb-4">
            Version 1.0.0
          </p>
          <p className="text-gray-400">
            © 2024 Social Media Detective. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
