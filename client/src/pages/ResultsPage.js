import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Loader } from 'lucide-react';

function ResultsPage() {
  const { platform, username } = useParams();
  const { t } = useTranslation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/results/search/${platform}/${username}`);
        if (response.data && response.data.length > 0) {
          setResult(response.data[0]);
        } else {
          setError(t('results.notFound'));
        }
      } catch (err) {
        setError(err.response?.data?.error || t('results.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [platform, username, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-6 py-4 rounded-lg max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6">
          <div className="flex gap-6 mb-6">
            {result?.profile?.profileImage && (
              <img
                src={result.profile.profileImage}
                alt={result.username}
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {result?.profile?.displayName || result?.username}
              </h1>
              <p className="text-gray-400 mb-4">@{result?.username}</p>
              <p className="text-gray-300">{result?.profile?.bio}</p>
              {result?.profile?.location && (
                <p className="text-gray-400 mt-2">📍 {result.profile.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">
              {result?.stats?.followers?.toLocaleString()}
            </div>
            <div className="text-gray-400">{t('results.followers')}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">
              {result?.stats?.following?.toLocaleString()}
            </div>
            <div className="text-gray-400">{t('results.following')}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">
              {result?.stats?.posts?.toLocaleString()}
            </div>
            <div className="text-gray-400">{t('results.posts')}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">
              {result?.stats?.engagementRate?.toFixed(2)}%
            </div>
            <div className="text-gray-400">{t('results.engagement')}</div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">{t('results.accountStatus')}</h2>
          <div className="space-y-4">
            {result?.status?.isVerified && (
              <div className="flex items-center gap-3 text-green-400">
                <span>⭐</span>
                <span>{t('results.verified')}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-gray-300">
              <span>🔒</span>
              <span>
                {result?.status?.isPrivate ? t('results.private') : t('results.public')}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span>📱</span>
              <span>{result?.status?.accountType || 'Personal'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
