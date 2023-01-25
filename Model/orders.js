const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true, "User ID is required"]
    },
    products : [{
        productId : String,
        quantity : Number
    }],
    totalAmount : Number,
    purchasedOn : {
        type : Date,
		default : new Date(+new Date() + 7*24*60*60*1000)
    },
    isCheckedout : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("Order", orderSchema);