 /*  -----------
 *	  Takro.
 *	-----------
 *
 *		Dumas Ayrton & Cherbuin Anthony
 *		© 2016
 *		v0.0.1
 *
 *		Liste des schémas mongoose.
 *		vue graphique dans le fichier "/doc/db/schema.xlsx"
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	email: String,
	password: String, //hash généré par "passport"
	firstname: String,
	lastname: String,
	isverified: {
		type: Boolean,
		default: false
	},
	work: String,
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'company'		//	réf. Company
	},
	npa: String,
	city: String,
	country: String,
	creation: {
		type: Date,
		default: Date.now
	},
	notifications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'notification'		//	réf. Company
		}
	]
});

var notificationSchema = new mongoose.Schema({
	message: String,
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	creation: {
		type: Date,
		default: Date.now,
	},
	viewed: {
		type: Boolean,
		default: false
	}
})

var documentSchema = new mongoose.Schema({
	filename: String,
	type: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'		//	réf. userSchema
	},
	download: {
		type: Number,
		default: 0
	},
	vote: [{
		value: Number,
		author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'	//	réf. userSchema
		}
	}],
	creation: {
		type: Date,
		default: Date.now
	},
	comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'	//	réf. tagSchema
    }
	],
	tags: [
		{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'	//	réf. tagSchema
    }
	],
	subscibers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'	//	réf. tagSchema
		}
	]
})

var companySchema = new mongoose.Schema({
	name: String,
	accro: String,
	npa: String,
	city: String,
	country: String,
	isverified : Boolean,
	tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'	//	réf. tagSchema
    }
	]
})


var commentSchema = new mongoose.Schema({
	text: String,
	author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'	//	réf. userSchema
	},
	creation: {
		type: Date,
		default: Date.now
	},
	vote: [{
		value: Number,
		author:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'	//	réf. userSchema
		}
	}],
})

var tagSchema = new mongoose.Schema({
	label: String,
	use: {
		type: Number,
		default: 1
	},
})


mongoose.model('User', userSchema);
mongoose.model('Document', documentSchema);
mongoose.model('Company', companySchema);
mongoose.model('Tag', tagSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Notification', notificationSchema);
