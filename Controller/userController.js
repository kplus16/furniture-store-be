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
                    firstName : result.firstName,
                    lastname : result.lastName,
                    userType : result.userType
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
        firstName : reqBody.firstName,
        lastName : reqBody.lastName,
        email : reqBody.email,
        password : bcrypt.hashSync(reqBody.password, 10)
    });

    return newUser.save().then((user, error) => {
        if(error){
            return {
                message : "an error occured"
            }
        }else{
            return {
                message : `Successfully added ${user.firstName} ${user.lastName}`
            }
        }
    })
}

//retrieve user details

//set user as admin - admin only

//