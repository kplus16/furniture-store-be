const express = require("express");
const router = express.Router();
const auth = require("../auth");
// const { Storage } = require("@google-cloud/storage")
// const Multer = require('multer')
// require("dotenv").config();

// const storage = new Storage({
//     projectId: process.env.GCLOUD_PROJECT_NAME, 
//     credentials: {
//         client_email: process.env.GCLOUD_STORAGE_EMAIL, 
//         private_key: process.env.GCLOUD_PRIVATE_KEY
//     }
// });

// const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

// const multer = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// });

// router.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

const productController = require("../Controller/productController");

//createProduct route x
router.post("/createproduct", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.createProduct(req.body)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
});

//retrieve all 
router.get("/", (req, res) => {
    productController.getActiveProducts()
    .then(result => res.send(result))
});

//update product route x
router.put("/updateProduct/:productId", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.updateProduct(req.params.productId, req.body)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to update a product"})
    }
});
//get one product route x
router.get("/:productId", (req, res) => {
    productController.getProduct(req.params.productId)
    .then(result => res.send(result))
});

//archive product route x
router.put("/archiveProduct/:productId", auth.verify, (req, res) => {
    if(auth.decode(req.headers.authorization).isAdmin){
        productController.archiveProduct(req.params.productId)
        .then(result => res.send(result))
    }else{
        res.send({message : "User must be admin to create a product"})
    }
});


module.exports = router;