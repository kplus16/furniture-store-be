const express = require("express");
const router = express.Router();
const auth = require("../auth");

const productController = require("../Controller/productController");

//createProduct route
router.post("/createproduct", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.createProduct(req.body)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
});

//update product route
router.put("/updateProduct/:productId", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.updateProduct(req.params.productId, req.body)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
});
//get one product route
router.get("/getproduct/:productId", (req, res) => {
    pruductController.getProduct(req.params.productId)
    .then(result => res.send(result))
});

//archive product route
router.put("/archiveProduct/:productId", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.updateProduct(req.params.productId)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
});


module.exports = router;