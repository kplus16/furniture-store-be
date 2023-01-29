const User = require("../Model/user");
const bcrypt = require("bcrypt");
const auth = require("../auth");



//test get all
// module.exports.getAll = () => {
//     return {
//         "name" : "Kendrick",
//         "last" : "mundiz"
//     }
// }

//login module
module.exports.login = (reqBody) => {
	return User.findOne({ email : reqBody.email }).then(result => {
		if(result == null){
            return {
                message : "User not found on database"
            }
        }else{
            if(bcrypt.compareSync(reqBody.password, result.password)){
                 return {
                    accessToken : auth.createAccessToken(result),
                }
            }else{
                return{
                    message : "incorrect password"
                }
            }
           
        }
	})
}


//registration module
module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        email : reqBody.email,
        password : bcrypt.hashSync(reqBody.password, 10)
    });
    return newUser.save().then((user, error) => {
        if(error){
            return {
                message : errors.email.message
            }
        }else{
            return {
                message : `Successfully added ${user.email}`
            }
        }
    })
}

//retrieve user details
module.exports.getUserData = (userId) => {
    return User.findById(userId)
    .then(result => {
        if (result === null){
            return "User not found"
        } else {
            return result
        }
    })
}
//set user as admin - admin only

