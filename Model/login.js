
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	fname: String,
    lname: String,
    userName: String,
    password: String,
	userType : {
		type : String,
		default : "customer"
	}
});

module.exports = mongoose.model("User", userSchema);