var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null});
		//redirect to user page
	});

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		console.log("Sending message to user");
		res.send({state: 'failure', user: null, message: "Invalid username or password"});
	});

/*
	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}), function (req, res) {
	});
*/

	router.post('/login', function(req, res, next) {
	  passport.authenticate('login', function(err, user, info) {
	    if (err) { return next(err); }
	    // Redirect if it fails
	    if (!user) { return res.send('Invalid username or password'); }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      // Redirect if it succeeds
	      return res.send('success');
	    });
	  })(req, res, next);
	});

	//sign up
	router.post('/signup', function(req, res, next){

		console.log(req.body);
		if(req.body.email == null || req.body.password == null){
			return res.send("email or password missing");
		}
		passport.authenticate('signup', {
			successRedirect: '/auth/success',
			failureRedirect: '/auth/failure'
		}, function(err, user, info){
			if(!user) {
				console.log(err);
				return res.send(err);
			}
			return res.redirect('/');
		})(req, res, next)
});

	//log out
	router.get('/signout', function(req, res) {
		req.logOut()
		req.session.destroy(function (err) {
	    res.redirect('/'); //Inside a callback… bulletproof!
	  });
	});


	//Confirm email
	router.get('/:id/confirm', function(req, res) {
		var userId = req.params.id;
		User.findById(userId, function(err, user) {
				if(!user){
					res.redirect('/');
				}
				if(user.isverified){
					res.redirect('/');
				}else{
					user.isverified = true;
					user.save();
					res.send("Verification sucess")
				}
		});
	});


	router.get('/user_data', function(req, res) {

			console.log(req.user);

      if (req.user === undefined) {
          // The user is not logged in
          res.json({});
      } else {
          res.json({
              user: req.user
          });
      }
  });

	return router;

}
