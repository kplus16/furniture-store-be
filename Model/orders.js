const mongoose = require("mongoose");
const products = require("./products")

const newProductSchema = new mongooose.Schema({
        productName : String,
        quantity : {
            type: Number,
            required : true,
            min : 1
        },
        price : Number
});

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true, "User ID is required"]
    },
    products : [newProductSchema],
    totalAmount: {
        type: Number,
        default : 0
        // default: function() {
        //     return this.products.reduce((total, obj) => total + (obj.quantity*obj.price), 0);
        // }
    },
    purchasedOn : {
        type : Date,
		default : () => Date.now()
    }
});

//everytime a new product is inserted, update the totalamount field
orderSchema.post('update', function(error, res, next) {
    let sum = 0;
    if (error) {
        next(new Error(error.message));
    } else {
        this.products.forEach(item => {
            sum += item.quantity*item.price
        });
        this.totalAmount = sum;
        next(); 
    }
})


module.exports = mongoose.model("Order", orderSchema);