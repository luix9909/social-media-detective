import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Mail, Heart } from 'lucide-react';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">🔍 {t('app.title')}</h1>
        <p className="text-xl text-gray-400 mb-12">{t('app.subtitle')}</p>

        <div className="space-y-8">
          {/* About */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">{t('about.about')}</h2>
            <p className="text-gray-300 leading-relaxed">
              Social Media Detective is a powerful tool designed to help you gather public information about social media accounts across multiple platforms. With a simple username, you can get comprehensive data including profile information, statistics, account status, and security indicators.
            </p>
          </div>

          {/* Features */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('about.features')}</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Multi-platform support
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Real-time search results
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Multi-language support
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Search history tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Export results
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-400">✓</span> Account comparison
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('about.contact')}</h2>
            <div className="space-y-4">
              <a href="https://github.com/luix9909/social-media-detective" className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition">
                <Github className="w-5 h-5" />
                GitHub Repository
              </a>
              <a href="mailto:luix9909@gmail.com" className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition">
                <Mail className="w-5 h-5" />
                luix9909@gmail.com
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-500/20 border border-yellow-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">⚠️ {t('about.disclaimer')}</h2>
            <p className="text-yellow-200">
              This tool is designed to gather public information only. Users are responsible for complying with the Terms of Service of each platform and all applicable laws and regulations. The authors are not responsible for misuse of this tool.
            </p>
          </div>

          {/* Made with love */}
          <div className="text-center py-8">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart className="w-5 h-5 text-red-500" /> by luix9909
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
