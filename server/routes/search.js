const express = require('express');
const router = express.Router();
const Search = require('../models/Search');
const Result = require('../models/Result');
const scrapers = require('../scrapers');

// POST: Search for a user
router.post('/', async (req, res, next) => {
  try {
    const { username, platform } = req.body;

    if (!username || !platform) {
      return res.status(400).json({ error: 'Username and platform are required' });
    }

    // Create search record
    const search = new Search({
      username: username.trim(),
      platform,
      metadata: {
        userAgent: req.get('user-agent'),
        language: req.get('accept-language')
      }
    });

    await search.save();

    // Perform scraping based on platform
    const platformScraper = scrapers[platform] || scrapers['auto-detect'];
    
    if (!platformScraper) {
      search.status = 'failed';
      search.error = 'Unsupported platform';
      await search.save();
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    const result = await platformScraper.search(username);

    if (result.found) {
      const savedResult = new Result({
        username,
        platform,
        ...result.data,
        fetchedAt: new Date()
      });
      await savedResult.save();

      search.status = 'success';
      search.resultId = savedResult._id;
    } else {
      search.status = 'not-found';
    }

    await search.save();

    res.json({
      searchId: search._id,
      status: search.status,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// GET: Get search details
router.get('/:searchId', async (req, res, next) => {
  try {
    const search = await Search.findById(req.params.searchId).populate('resultId');
    
    if (!search) {
      return res.status(404).json({ error: 'Search not found' });
    }

    res.json(search);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
