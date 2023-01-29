const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    email : {
		type: String,
		required : true,
		unique : true
	},
    password: {
		type: String,
		required : true
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	orders : [{
		products : [{
			productName : String,
			quantity : Number
		}],
		totalAmount: Number,
		purchasedOn: {
			type : Date,
			default : () => Date.now()
		}
	}]
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);