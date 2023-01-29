const express = require("express");
const router = express.Router();

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
})

//signup
router.post("/register", (req, res) =>{
    userController.registerUser(req.body)
    .then(result => res.send(result));
})


module.exports = router;