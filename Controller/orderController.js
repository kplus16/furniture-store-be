const Order = require("../Model/orders");

//retrieve all orders admin only
module.exports.getAllOrders = (userId) => {
    Order.find({})
    .then(result => {
        if (result.length > 0){
            return result
        }else {
            return "No Orders yet"
        }
    })
}

//retrieve orders for specific user
module.exports.getMyOrders = (userId) => {
    Order.find({userId : userId})
    .then(result => {
        if (result.length > 0){
            return result
        }else {
            return "User doesn't have orders yet"
        }
    })
}