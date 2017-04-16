var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var fileUpload = require('express-fileupload');
const path = require('path');

//	importation des schémas mongoose
var Document = mongoose.model('Document');
var User = mongoose.model('User');
var Company = mongoose.model('Company');
var Tag = mongoose.model('Tag');
var Comment = mongoose.model('Comment');
var Notification = mongoose.model('Notification');



//	middleware pour l'upload de fichier
router.use(fileUpload());


//	middleware: test si l'utilisateur est connecté
function isAuthenticated (req, res, next) {

	if (req.isAuthenticated()){

		return next();
	}
	// retour à la page de login
	return res.redirect('/');
};


//	application du middleware d'authentification -- UNCOMMENT
//router.use('/docs', isAuthenticated);
//router.use('/comments', isAuthenticated);


/* 	route des docuemnts. */
router.route('/docs')

		/*
			----------------------
			Création d'un document
			----------------------

			{
				filename: (string),
				type: (string),
				tags: ( array string )
			}

			---------------------------
		*/
		.post(function(req, res){

			var doc = new Document();
			doc.filename = req.body.filename.trim().toUpperCase();
			doc.author = req.user.id;

			//upload
			if (req.files) {

				req.files.document.mv(path.resolve(__dirname ,'../uploads/' + doc._id) , function(err) {
						if (err) {
								console.log("file not uploaded: " + err);
						}



						if(req.body.tags){
							console.log(req.body.tags);
							console.log(req.body.tags.split(" "));
							req.body.tags = req.body.tags.split(" ").map(function(label) {
																		return label.trim().toUpperCase();
																		})
						}else{
							req.body.tags = [];
						}

						Tag.find({'label':
							{$in: req.body.tags
							}},function(err,oldTags){

							if(err) res.send(err);
							var tags_id = [];
							var db_labels = [];
							var db_ids = [];

							for (var i = 0; i < oldTags.length; i++) {
								db_labels.push( oldTags[i].label.trim().toUpperCase() );
								db_ids.push( oldTags[i]._id );
							}

							for (var i = 0; i < req.body.tags.length; i++) {
								var label = req.body.tags[i].trim().toUpperCase();
								var tag_id = "";
								if ( db_labels.indexOf(label) == -1) {


									console.log("TAG NOT FOUND: " + label);

									//tag not found
									var tag = new Tag();
									tag.label = label;
									tag_id = tag._id;
									tag.save();

								} else {

									//tag found
									tag_id = db_ids[db_labels.indexOf(label)];
									var tag = oldTags[db_labels.indexOf(label)];
									console.log("TAG FOUND: " + tag);
									tag.use++;
									tag.save();

								}
								tags_id.push( tag_id )
							}

							doc.type = req.files.document.name.split('.').pop();

							//test si l'extension est acceptée
							// TODO

							doc.tags = tags_id;
							doc.save(function(err, doc) {
								if (err){
									return res.send(err);
								}
								return res.json(doc);
							});
						});

				});
			}
		})


		/*
			----------------------------------
			Récupération de tous les documents
			----------------------------------
		*/
		.get(function(req, res){
			Document
			.find({})
			.populate('author')
			.populate('comments')
			.populate('tags')
			.exec(function(err, docs){
				if(err){
					return res.send(err);
				}
				return res.send(docs);
			});
		});


/* 	route pour un document. */
router.route('/docs/:id')

		/*
			--------------------------------
			Retourne les infos d'un document
			--------------------------------
		*/
		.get(function(req, res){
			Document.findById(req.params.id, function(err, doc){
				if(err)
					res.send(err);
				res.json(doc);
			});
		})


		/*
			--------------------------
			Modification d'un document
			--------------------------

			{
				filename: (string)
			}

			---------------------------
		*/
		.put(function(req, res){
			Document.findById(req.params.id, function(err, doc){
				if(err)
					res.send(err);

				var filename = req.body.filename.trim().toUpperCase();
				doc.filename = filename.trim().toUpperCase() ? filename : "";

				doc.save(function(err, doc){
					if(err)
						res.send(err);

					res.json(doc);
				});
			});
		})


		//	supprime un documents
		.delete(function(req, res) {
			Document.remove({
				_id: req.params.id
			}, function(err) {
				if (err)
					res.send(err);
				res.json("deleted :(");
			});
		});


/*	route pour télécharger un document */
router.route('/docs/:id/download')
		.get(function(req, res) {
			//test user ..
			// points

			Document.findById(req.params.id, function(err, doc){
				if(err)
					res.send(err);


				doc.download++;
				doc.subscibers.push(req.user.id)
				doc.save();

				User.findById(req.user.id , function(err, currentUser){
					if(err)
						res.send(err);

					//Ajout dans les notifications de l'auteur
					User.findById(doc.author, function(err, author){
						if(err)
							res.send(err);

						var notification = new Notification();
						notification.message = currentUser.firstname + " " + currentUser.lastname + " downloaded " + doc.filename;
						notification.from = currentUser;
						notification.to = author;
						notification.save();

						author.notifications.push(notification);
						author.save();


						//console.log(req.io.sockets.connected);
						for (var i in req.io.sockets.connected) {
								var s = req.io.sockets.connected[i];
								if (s.userid == doc.author) {
									var message =  "Your file " + (doc.filename) + " has been downloaded ! ";
									s.emit("notification", notification);
								}
						}

					})
				})

				res.setHeader('Content-disposition', 'attachment; filename=' + doc.filename + "." + doc.type);
				res.sendFile( req.params.id , {"root": "uploads/"});
			});



		});



/*	route pour les commentaires. */
router.route('/docs/:id/comments')

			/*
				----------------------
				Tous les commentaires d'un documentSchema
				----------------------
			*/
			.get(function(req, res){
				Document
				.findById(req.params.id)
				.populate({
				  path: 'comments',
				  model: 'Comment',
				  populate: {
				    path: 'author',
				    model: 'User'
				  }
				}
				)
				.exec(function(err, doc){
					if(err){
						return res.send(err);
					}


					return res.send(doc.comments);
				});
			})

			/*
				----------------------
				Ajout d'un commentaire
				----------------------

				{
					text: (string)
				}

				----------------------
			*/
			.post(function(req, res){
				Document.findById(req.params.id, function(err, doc){
					if(err)
						res.send(err);

					var comment = new Comment();
					comment.author = req.user.id;
					comment.text = req.body.text.trim()
					comment.save();

					doc.comments.push(comment._id);

					doc.save(function(err, doc){
						if(err)
							res.send(err);

						User.findById(req.user.id , function(err, currentUser){
							if(err)
								res.send(err);

							//Ajout dans les notifications de l'auteur
							User.findById(doc.author, function(err, author){
								if(err)
									res.send(err);

								var notification = new Notification();
								notification.message = currentUser.firstname + " " + currentUser.lastname + " a commenté " + doc.filename;
								notification.from = currentUser;
								notification.to = author;
								notification.save();

								author.notifications.push(notification);
								author.save();


								//console.log(req.io.sockets.connected);
								for (var i in req.io.sockets.connected) {
										var s = req.io.sockets.connected[i];
										if (s.userid == doc.author) {
											s.emit("notification", notification);
										}
								}

							})
						})

						res.json(doc);
					});
				});
			})

/*	route pour les vote de document. */
router.route('/docs/:id/vote')

			/*
				----------------------
				Ajout d'un vote
				----------------------

				{
					vote: (int)
				}

				----------------------
			*/
			.post(function(req, res){
				Document.findById(req.params.id, function(err, doc){
					if(err)
						res.send(err);

						var exist = false;
						for (var i = 0; i < doc.vote.length; i++) {
							if(doc.vote[i].author == req.user.id){
								exist = true;
								break;
							}
						}

						// si l'utlisateur n'as pas encore voter le document
						if (!exist) {
							if (req.body.vote < 0) {
								doc.vote.push({
									author: req.user.id,
									value: -1
								});
							}else{
								doc.vote.push({
									author: req.user.id,
									value: 1
								});
							}
							//res.send("T'as déjà voté")
						}

					doc.save(function(err, doc){
						if(err)
							res.send(err);

						res.json(doc);
					});
				});
			})



/* TODO route pour vote document */


/*	route pour les votes de commentaire. */
router.route('/comments/:id/vote')

			/*
				----------------------
				Ajout d'un vote
				----------------------

				{
					vote : int
				}

				----------------------
			*/
			.post(function(req, res){
				Comment.findById(req.params.id, function(err, comment){
					if(err)
						res.send(err);

					var exist = false;
					for (var i = 0; i < comment.vote.length; i++) {
						if(comment.vote[i].author === req.user.id){
							exist = true;
							break;
						}
					}

					if (!exist) {
						if (req.body.vote < 0) {
							comment.vote.push({
								author: req.user.id,
								value: -1
							});
						}else{
							comment.vote.push({
								author: req.user.id,
								value: 1
							});
						}
					}

					comment.save(function(err, comment){
						if(err)
							res.send(err);

						res.json(comment);
					});
				});
			})




/* route pour les companies. */
router.route('/company')

	/*
		---------------------
		Ajout d'une companie.
		---------------------

		{
			name: string
			npa: string
			city: string
			country: string
			tags: string[]
		}

		---------------------
	*/
	.post(function(req, res){

		var comany_name = req.body.name.trim().toUpperCase();
		Company.findOne({'name': comany_name}, function(err, c) {

			if(err) res.send(err);

			if (c) {
				res.json({status:'failure', message:'Company already exist'});

			}else {

				company = new Company();
				company.name = req.body.name.trim().toUpperCase()
				company.npa = req.body.npa.trim().toUpperCase()
				company.city = req.body.city.trim().toUpperCase()
				company.country = req.body.country.trim().toUpperCase()
				company.accro = req.body.accro.trim().toUpperCase()

				Tag.find({'label':
					{$in: req.body.tags.map(function(label) {
  															return label.trim().toUpperCase();
																})
					}},function(err,oldTags){

					if(err) res.send(err);
					var tags_id = [];
					var db_labels = [];
					var db_ids = [];

					for (var i = 0; i < oldTags.length; i++) {
						db_labels.push( oldTags[i].label.trim().toUpperCase() );
						db_ids.push( oldTags[i]._id );
					}

					for (var i = 0; i < req.body.tags.length; i++) {
						var label = req.body.tags[i].trim().toUpperCase();
						var tag_id = "";
						if ( db_labels.indexOf(label) == -1) {


							console.log("TAG NOT FOUND: " + label);

							//tag not found
							var tag = new Tag();
							tag.label = label;
							tag_id = tag._id;
							tag.save();

						} else {

							//tag found
							tag_id = db_ids[db_labels.indexOf(label)];
							var tag = oldTags[db_labels.indexOf(label)];
							console.log("TAG FOUND: " + tag);
							tag.use++;
							tag.save();

						}
						tags_id.push( tag_id )
					}

					company.tags = tags_id;
					company.save(function(err, doc) {
						if (err){
							return res.send(err);
						}
						return res.json(doc);
					});
				});
			}
		})
	})


	/*	route pour les commentaires. */
	router.route('/user/notifications')

				.get(function(req, res){
					if (req.user) {
						Notification
						.find({ 'to': req.user.id })
						.sort('-creation')
						.exec(function(err, notifications){
							if(err) return res.send(err);
							return res.json(notifications)
						})
					}
				})

				.post(function(req, res){
					if (req.user) {
						var query = { to: req.user.id };
						Notification.update(query, { viewed: true },{ multi: true }, function(err, numRows){
							if(err) return res.send(err);


						})

					}
				})


module.exports = router;
