const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    isActive : {
        type : Boolean,
        default : true
    },
    createdOn : {
			type : Date,
			default : new Date(+new Date() + 7*24*60*60*1000)
	}
});

module.exports = mongoose.model("Product", productSchema);