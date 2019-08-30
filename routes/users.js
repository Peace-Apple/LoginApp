import express from 'express';
import bcrypt from 'bcryptjs';
import models from '../models';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const router = express.Router();

// Register
router.get('/register', (req, res) => {
  res.render('register');
})

// Login
router.get('/login', (req, res) => {
  res.render('login');
})

// Register User
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
      if (newUser) {
        req.flash('success_msg', 'You have successfully registered and can now log in')
        res.redirect('/users/login')
      }
    });
//   }
});

passport.use(new LocalStrategy(
  async(username, password, done) => {
    const user = await models.User.findOne({
      where: {
        username
      }
    });

    if(!user) {
      return done(null, false, {
        message: 'Unknown user'
      })
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return done(null, false, {
        message: 'Password is incorrect, please enter the right one!'
      })
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  const user = await models.User.findByPk(id);
  done(null, user);
});

// Login user 
router.post('/login',
  passport.authenticate('local', { successRedirect: '/', 
    failureRedirect: '/users/login', failureFlash: true }),
  (req, res) => {
    res.redirect('/');
});

// Logout user
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
 