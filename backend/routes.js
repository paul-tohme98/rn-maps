// api/routes/mapPoints.js
const express = require('express');
const router = express.Router();
// const { insertMapPoints } = require('../api/mapPoints');

// API endpoint to insert map points
router.post('/', async (req, res) => {
  try {
    const { points } = req.body;
    await insertMapPoints(points);
    res.status(200).json({ message: 'Map points inserted successfully' });
  } catch (error) {
    console.error('Error inserting map points:', error);
    res.status(500).json({ error: 'Failed to insert map points' });
  }
});

module.exports = router;
