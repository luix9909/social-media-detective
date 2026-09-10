const express = require('express');
const router = express.Router();

// GET: Get application settings
router.get('/', (req, res) => {
  const settings = {
    languages: [
      { code: 'ar', name: 'العربية' },
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
      { code: 'es', name: 'Español' },
      { code: 'tr', name: 'Türkçe' }
    ],
    platforms: [
      { id: 'telegram', name: 'Telegram', icon: '📱' },
      { id: 'instagram', name: 'Instagram', icon: '📸' },
      { id: 'tiktok', name: 'TikTok', icon: '🎵' },
      { id: 'twitter', name: 'Twitter/X', icon: '𝕏' },
      { id: 'youtube', name: 'YouTube', icon: '📺' },
      { id: 'snapchat', name: 'Snapchat', icon: '👻' }
    ],
    features: {
      export: process.env.ENABLE_EXPORT !== 'false',
      compare: process.env.ENABLE_COMPARE !== 'false',
      analytics: process.env.ENABLE_ANALYTICS !== 'false',
      notifications: process.env.ENABLE_NOTIFICATIONS === 'true'
    }
  };

  res.json(settings);
});

module.exports = router;
