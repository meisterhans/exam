var express   = require('express');
var router 	  = express.Router();
var fs        = require('fs');
var passport  = require('passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
  users = fs.readFileSync("./users.json");
  users = JSON.parse(users);

  res.render('users', { title: 'Список пользователей', users: users});
});

/* GET login page. */
router.get('/login', function(req, res) {
  req.logout();
  res.render('login', { title: 'Авторизация пользователя' }); 
});

/* GET logout user. */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/* GET user profile page */
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    title: 'Профиль пользователя',
    user: req.user
  });
});

/* GET user raw page */
router.get('/raw', isLoggedIn, function(req, res) {
  res.render('raw', {
    title: 'RAW',
    user: req.user
  });
});

/* POST user login process. */
router.post('/login/process', passport.authenticate('local', {
  failureRedirect : '/users/login'
}), function(req, res) {
  if(req.session.returnTo != undefined) {
    var redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
  } else {
    var redirectUrl = '/users/profile';
  }

  res.redirect(redirectUrl);
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    req.session.returnTo = req.originalUrl;

    res.redirect('/users/login');
}

