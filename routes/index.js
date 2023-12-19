var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStertergy = require('passport-local');

passport.use(new localStertergy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/profile', isLoggedIn , function(req, res, next) {
  res.render('profile');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post("/register" , function(req , res , next){
  const userdata = new userModel({
    username : req.body.username,
    name : req.body.name,
    email : req.body.email,
    mobile : req.body.mobile
  });
  userModel.register(userdata,req.body.password)
  .then(function(){
    passport.authenticate("local")(req , res , function(){
      res.redirect("/profile")
    })
  })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}),function(req,res){})

router.get("/logout",function(req , res, next){
  req.logOut(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/login')
  })
});

function isLoggedIn(req , res , next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}



module.exports = router;
