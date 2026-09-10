const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// GET: Get result by ID
router.get('/:resultId', async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.resultId);
    
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET: Get results by platform and username
router.get('/search/:platform/:username', async (req, res, next) => {
  try {
    const results = await Result.find({
      platform: req.params.platform,
      username: new RegExp(req.params.username, 'i')
    }).sort({ fetchedAt: -1 }).limit(10);

    res.json(results);
  } catch (error) {
    next(error);
  }
});

// POST: Compare two accounts
router.post('/compare', async (req, res, next) => {
  try {
    const { resultId1, resultId2 } = req.body;

    const result1 = await Result.findById(resultId1);
    const result2 = await Result.findById(resultId2);

    if (!result1 || !result2) {
      return res.status(404).json({ error: 'One or both results not found' });
    }

    const comparison = {
      account1: {
        username: result1.username,
        platform: result1.platform,
        stats: result1.stats,
        status: result1.status
      },
      account2: {
        username: result2.username,
        platform: result2.platform,
        stats: result2.stats,
        status: result2.status
      },
      differences: {
        followerDiff: (result1.stats?.followers || 0) - (result2.stats?.followers || 0),
        engagementDiff: (result1.stats?.engagementRate || 0) - (result2.stats?.engagementRate || 0),
        postsDiff: (result1.stats?.posts || 0) - (result2.stats?.posts || 0)
      }
    };

    res.json(comparison);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
