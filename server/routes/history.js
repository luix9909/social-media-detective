const express = require('express');
const router = express.Router();
const Search = require('../models/Search');

// GET: Get search history
router.get('/', async (req, res, next) => {
  try {
    const { limit = 20, page = 1, platform } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (platform) query.platform = platform;

    const history = await Search.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('resultId', 'username platform profile stats');

    const total = await Search.countDocuments(query);

    res.json({
      data: history,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Delete search record
router.delete('/:searchId', async (req, res, next) => {
  try {
    const search = await Search.findByIdAndDelete(req.params.searchId);

    if (!search) {
      return res.status(404).json({ error: 'Search not found' });
    }

    res.json({ message: 'Search record deleted', searchId: req.params.searchId });
  } catch (error) {
    next(error);
  }
});

// DELETE: Clear all history
router.delete('/', async (req, res, next) => {
  try {
    const result = await Search.deleteMany({});
    res.json({ message: 'All search history cleared', deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
