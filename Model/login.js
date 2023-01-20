const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName: String,
    lastName: String,
    email : String,
    password: String,
	userType : {
		type : String,
		default : "customer"
	}
});

module.exports = mongoose.model("User", userSchema);