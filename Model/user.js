const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email : String,
    password: String,
	isAdmin : {
		type : Boolean,
		default : "customer"
	},
	orders : [{
		products : [{
			productName : String,
			quantity : Number
		}],
		totalAmount: Number,
		purchasedOn: {
			type : Date,
			default : new Date(+new Date() + 7*24*60*60*1000)
		}
	}]
});

module.exports = mongoose.model("User", userSchema);