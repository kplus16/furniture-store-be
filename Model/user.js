const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

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
	cart : [{
		productName: { type: String, required: true },
		quantity: { type: Number, required: true },
	}]
});

// userSchema.virtual("subTotal").get(function() {
//   return this.quantity * this.price;
// });

userSchema.plugin(uniqueValidator);

// productSchema.post("save", function(doc) {
//   doc.constructor.updateOne(
//     { _id: doc.owner },
//     { $inc: { totalAmount: doc.quantity * doc.price } },
//     function(error, cart) {
//       if (error) {
//         console.log("Error updating totalAmount:", error);
//       }
//     }
//   );
// });

module.exports = mongoose.model("User", userSchema);