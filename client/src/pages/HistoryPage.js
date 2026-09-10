import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Loader, Trash2 } from 'lucide-react';

function HistoryPage() {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history');
      setHistory(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || t('history.error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`/api/history/${id}`);
      setHistory(history.filter(h => h._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || t('history.deleteError'));
    }
  };

  const clearAll = async () => {
    if (window.confirm(t('history.confirmClear'))) {
      try {
        await axios.delete('/api/history');
        setHistory([]);
      } catch (err) {
        setError(err.response?.data?.error || t('history.clearError'));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">{t('nav.history')}</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-6">{t('history.empty')}</p>
          </div>
        ) : (
          <>
            <button
              onClick={clearAll}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mb-6"
            >
              {t('history.clearAll')}
            </button>

            <div className="space-y-4">
              {history.map(record => (
                <div key={record._id} className="bg-gray-800 rounded-lg p-6 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      @{record.username}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {record.platform} • {new Date(record.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                      record.status === 'success' ? 'bg-green-500/20 text-green-400' :
                      record.status === 'not-found' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteRecord(record._id)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
