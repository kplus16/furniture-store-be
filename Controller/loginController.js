const Task = require("../Model/login")

module.exports.login = (username) => {
	return Task.findOne(username).then(result => {
		if(result.json().length > 0){
            console.log("Login");
        }else{
            console.log("Cannot login")
        }
	})
}