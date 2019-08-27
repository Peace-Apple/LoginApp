import express from 'express';

const router = express.Router();

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

// Login
router.post('/login', (req, res) => {
  res.render('login');
})

module.exports = router;
