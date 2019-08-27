import express from 'express';

const router = express.Router();

// home
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
