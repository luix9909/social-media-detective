import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, Loader } from 'lucide-react';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('auto-detect');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(t('home.emptyUsername'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/search', {
        username: username.trim(),
        platform
      });

      if (response.data.status === 'success') {
        navigate(`/results/${platform}/${username}`);
      } else if (response.data.status === 'not-found') {
        setError(t('home.userNotFound'));
      } else {
        setError(t('home.searchError'));
      }
    } catch (err) {
      setError(err.response?.data?.error || t('home.searchError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🔍 {t('app.title')}</h1>
          <p className="text-xl text-gray-300">{t('app.subtitle')}</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-gray-800 rounded-lg shadow-2xl p-8 mb-8">
          <div className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                {t('home.username')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
              />
            </div>

            {/* Platform Select */}
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                {t('home.platform')}
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
              >
                <option value="auto-detect">{t('platforms.autoDetect')}</option>
                <option value="instagram">📸 Instagram</option>
                <option value="twitter">𝕏 Twitter</option>
                <option value="tiktok">🎵 TikTok</option>
                <option value="youtube">📺 YouTube</option>
                <option value="telegram">📱 Telegram</option>
                <option value="snapchat">👻 Snapchat</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {t('home.searching')}
                </>
              ) : (
                <>
                  <SearchIcon className="w-5 h-5" />
                  {t('home.search')}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-bold text-white mb-2">{t('home.feature1Title')}</h3>
            <p className="text-gray-400 text-sm">{t('home.feature1Desc')}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-white mb-2">{t('home.feature2Title')}</h3>
            <p className="text-gray-400 text-sm">{t('home.feature2Desc')}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="font-bold text-white mb-2">{t('home.feature3Title')}</h3>
            <p className="text-gray-400 text-sm">{t('home.feature3Desc')}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl mb-2">💾</div>
            <h3 className="font-bold text-white mb-2">{t('home.feature4Title')}</h3>
            <p className="text-gray-400 text-sm">{t('home.feature4Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
