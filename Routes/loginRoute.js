const express = require("express");
const router = express.Router();

const loginController = require("../Controller/loginController");

router.get("/login/:username", (req, res) => {
	loginController.logink(req.params.id).then(result => res.send(result));
});


module.exports = router;