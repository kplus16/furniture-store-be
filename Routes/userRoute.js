const express = require("express");
const router = express.Router();
const auth = require("../auth");

const userController = require("../Controller/userController");



//login
router.post("/login", (req, res) => {
    userController.login(req.body)
    .then(result => {
        if(result.message === "User not found on database"){
            res.status(400).send("User not found");
        }else if (result.message === "incorrect password"){
            res.status(401).send("Incorrect Password");
        }else{
            res.send(result)
        }
    })
});

//signup
router.post("/register", (req, res) =>{
    userController.registerUser(req.body)
    .then(result => res.send(result));
});


//retrieve user details x
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