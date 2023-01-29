const express = require("express");
const router = express.Router();
const auth = require("../auth");

const userController = require("../Controller/userController");

//test get
// router.get("/", (req, res) => {
// 	loginController.getAll()
// 	.then(result => res.send(result))
// })

//login
router.post("/login", (req, res) => {
    userController.login(req.body)
    .then(result => res.send(result))
});

//signup
router.post("/register", (req, res) =>{
    userController.registerUser(req.body)
    .then(result => res.send(result));
});


//retrieve user details
router.get("/retrieveUserDetails", auth.verify, (req, res) => {
    userController.getUserData(auth.decode(req.headers.authorization).id)
    .then(result => res.send(result))
})

// router.put("/updateUserType/:userId", auth.verify, (req, res) => {
//     if(auth.decode(req.headers.authorization).isAdmin){
//         userController.updateUserType(req.params.userId)
//         .then(result => res.send(result))
//     }else{
//         res.send({message : "User must be admin to create a product"})
//     }
// });

module.exports = router;