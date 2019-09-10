import express from 'express'; 
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import Strategy from 'passport-local'; 
import Router from './routes/index';
import UserRouter from './routes/users';


const port = 3007;

const app = express();

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'})); 
app.set('view engine', 'handlebars');


app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true 
  })
);

app.use(bodyParser.json());

app.use(cookieParser());
  
// set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// middleware for express session
app.use(session({ 
  secret: 'applelurve', 
  resave: true, 
  saveUninitialized: true  
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// express validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//     var namespace = param.split('.')
//       ,root    = namespace.shift()
//       ,formParam = root;
  
//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));


// connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// set up routes
app.use('/', Router);
app.use('/users', UserRouter);

app.listen(port, () => {console.log(`Server is running on port ${port}`)})
