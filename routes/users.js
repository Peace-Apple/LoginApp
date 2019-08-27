import express from 'express';
import bcrypt from 'bcryptjs';
import models from '../models';

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { name, username, email, password, password2 } = req.body;

  // validation
//   req.checkBody('name', 'Name is required').notEmpty();
//   req.checkBody('username', 'Username is required').notEmpty();
//   req.checkBody('email', 'Email is required').notEmpty();
//   req.checkBody('email', 'Email is not valid').isEmail();
//   req.checkBody('password', 'Password is required').notEmpty();
//   req.checkBody('password2', 'Passwords do not match').equals(password);

//   const errors = req.validationErrors();
//   if(errors) {
//     res.render('register', {
//         errors: errors
//     })
//   } else {
    bcrypt.hash(password, 10, async(err, hash) => {
      const newUser = await models.User.create({
        name: name,
        username: username,
        email: email,
        password: hash
      });
      console.log(newUser);
    });
//   }
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;
