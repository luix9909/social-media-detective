# 🔍 Social Media Detective

A powerful web application that helps you gather public and safe information about social media accounts across multiple platforms with just a username.

**Supported Platforms:**
- 📱 Telegram
- 📸 Instagram
- 🎵 TikTok
- 𝕏 Twitter/X
- 📺 YouTube
- 👻 Snapchat

## ✨ Features

- ✅ **Safe & Public Information Only** - Only gathers publicly available data
- ⚡ **Fast Search** - Real-time results across platforms
- 🌍 **Multi-language Support** - Arabic, English, French, Spanish, Turkish
- 💾 **Search History** - Keep track of all your searches
- 🎨 **Dark/Light Mode** - Beautiful UI with smooth animations
- 📊 **Detailed Analytics** - Account statistics and engagement metrics
- 🔐 **Security Warnings** - Alerts about account safety
- 📤 **Export Results** - Save as PDF or Excel
- 🔀 **Compare Accounts** - Compare multiple profiles side-by-side
- 📈 **Growth Analysis** - Track follower growth trends
- 🔗 **Share Results** - Generate shareable links
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **Playwright/Selenium** - Web scraping
- **MongoDB/PostgreSQL** - Database
- **Redis** - Caching
- **Docker** - Containerization

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **i18next** - Internationalization
- **Chart.js** - Data visualization
- **Axios** - HTTP client

### DevOps
- **Docker** - Container images
- **GitHub Actions** - CI/CD pipeline
- **Vercel/Heroku** - Hosting

## 📁 Project Structure

```
social-media-detective/
├── server/
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   └── scrapers.js
│   ├── routes/
│   │   ├── search.js
│   │   ├── results.js
│   │   ├── history.js
│   │   └── api.js
│   ├── controllers/
│   │   ├── searchController.js
│   │   ├── scrapeController.js
│   │   └── historyController.js
│   ├── scrapers/
│   │   ├── telegram.js
│   │   ├── instagram.js
│   │   ├── tiktok.js
│   │   ├── twitter.js
│   │   ├── youtube.js
│   │   └── snapchat.js
│   ├── models/
│   │   ├── Search.js
│   │   ├── Result.js
│   │   └── User.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── errorHandler.js
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── i18n/
│   │   │   ├── ar.json
│   │   │   ├── en.json
│   │   │   ├── fr.json
│   │   │   ├── es.json
│   │   │   └── tr.json
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── tests/
├── docs/
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Docker (optional)
- MongoDB or PostgreSQL

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/luix9909/social-media-detective.git
cd social-media-detective
```

2. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application**
```bash
npm run dev       # Development mode
npm start         # Production mode
```

The app will be available at `http://localhost:3000`

### Docker Setup

```bash
docker-compose up -d
```

## 📡 API Endpoints

### Search Endpoints
```
POST   /api/search          - Search for a user
GET    /api/results/:id     - Get search results
GET    /api/history         - Get search history
DELETE /api/history/:id     - Delete a search record
```

### Platform-Specific
```
GET    /api/instagram/:username
GET    /api/twitter/:username
GET    /api/tiktok/:username
GET    /api/youtube/:username
GET    /api/telegram/:username
GET    /api/snapchat/:username
```

### Settings & User
```
GET    /api/settings
POST   /api/settings        - Update user settings
POST   /api/export          - Export results
POST   /api/compare         - Compare accounts
```

## 🌐 Routes

- `/` - Homepage with search bar
- `/search` - Advanced search page
- `/results/:platform/:user` - Results page
- `/history` - Search history
- `/settings` - User preferences
- `/about` - About the application
- `/api/*` - API endpoints

## 🔒 Security & Privacy

- ✅ Only public data collection
- 🔐 Rate limiting on API endpoints
- 🛡️ CORS protection
- 🔑 Environment variable protection
- 📊 No personal data storage without consent
- 🚨 Security warnings for suspicious accounts

## 📊 Scraped Data Includes

- **Profile Information**
  - Username & Display Name
  - Profile Picture
  - Bio/Description
  - Location
  - External Links

- **Account Statistics**
  - Followers Count
  - Following Count
  - Post Count
  - Average Engagement Rate

- **Account Status**
  - Verification Badge
  - Account Type (Personal/Business)
  - Activity Status
  - Last Activity Time
  - Public/Private Status

- **Security Indicators**
  - Account Age
  - Two-Factor Authentication
  - Recent Changes
  - Suspicious Activity Alerts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This tool is designed to gather **public information only**. Users are responsible for complying with the Terms of Service of each platform and all applicable laws and regulations. The authors are not responsible for misuse of this tool.

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/luix9909/social-media-detective/issues)
- **Email**: luix9909@gmail.com
- **Twitter**: [@luix9909](https://twitter.com/luix9909)

## 🎯 Roadmap

- [ ] Advanced filtering options
- [ ] Real-time notifications
- [ ] Account growth tracking
- [ ] Batch searching
- [ ] API for developers
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Machine learning analysis
- [ ] Account verification tools

---

Made with ❤️ by [luix9909](https://github.com/luix9909)
