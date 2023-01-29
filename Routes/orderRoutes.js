const express = require("express");
const auth = require("../auth");
const router = express.Router();

const orderController = require("../Controller/orderController");

//retrieve all orders admin only
router.get("/getAllOrders", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        orderController.getAllOrders()
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
})


//retrieve orders for specific user
router.get("/getMyOrders", auth.verify, (req, res) => {
    orderController.getMyOrders(auth.decode(req.headers.authorization).id)
    .then(result => res.send(result))
})







module.exports = router