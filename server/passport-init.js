var mongoose = require('mongoose');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var emailTemplate = require('./views/email');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://ayrtondumas@gmail.com:Stitch1997*@smtp.gmail.com');



//	importation des schemas
var User = mongoose.model('User');
var Document = mongoose.model('Document');
var Company = mongoose.model('Company');
var Tag = mongoose.model('Tag');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.email);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user:',user.email);
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, email, password, done) {
			// check in mongo if a user with email exists or not
			User.findOne({ 'email' :  email.trim().toUpperCase() },
				function(err, user) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!user){
						console.log('User Not Found with email '+email);
						return done(null, false);
					}
					// User exists but wrong password, log the error
					if (!isValidPassword(user, password)){
						console.log('Invalid Password');
						return done(null, false); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					return done(null, user);
				}
			);
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true,
			usernameField: 'email',
			passwordField: 'password',
		},
		function(req, email, password, done) {

			console.log("email");
			// Recherche l'utilisateur dans la db
			User.findOne({ 'email' :  email.trim().toUpperCase() }, function(err, user) {

				// Termine l'opération si il y a des erreurs
				if (err){
					return done(err, false);
				}


				// Si l'utilisateur existe déjà.
				if (user) {
					return done('User already exists', false);
				} else {

					// Si l'utilisateur n'existe pas: créer l'utilisateur
					console.log("user creation started ...");




						var newUser = new User();
						// création de l'utilisateur

						newUser.email = email.trim().toUpperCase();
						newUser.password = createHash(password);
						newUser.firstname = req.body.firstname.trim().toUpperCase();
						newUser.lastname = req.body.lastname.trim().toUpperCase();
						newUser.work = req.body.work.trim().toUpperCase();


						//TODO modify request to check city AND country
							//Create company if not existing
							console.log(req.body);
							Company.findOne({'name' : req.body.company.trim().toUpperCase(),'city' : req.body.city.trim().toUpperCase()},function(err,company){
								if(company){
									newUser.company = company._id;
								}else{
									var new_company = new Company();
									new_company.name = req.body.company.trim().toUpperCase();
									new_company.city = req.body.city.trim().toUpperCase();
									newUser.company = new_company._id;
									new_company.save();
								}
								// sauvegarde l'utilisateur
								newUser.save(function(err) {
									if (err){
										throw err;
									}

									// setup e-mail data with unicode symbols
									var mailOptions = {
									    from: '"Takro." <no-reply@takro.ch>', // sender address
									    to: newUser.email+", " + newUser.email, // list of receivers
									    subject: 'Confirm your email', // Subject line
									    html: emailTemplate(newUser._id) // html body
									};

									// send mail with defined transport object
									transporter.sendMail(mailOptions, function(error, info){
									    if(error){
									        return console.log(error);
									    }
									    console.log('Message sent: ' + info.response);
									});

									return done(null, newUser);

								});
							});
				}
			});
		})
	);

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
