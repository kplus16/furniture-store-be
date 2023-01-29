const jwt = require("jsonwebtoken");
require("dotenv").config();
// User defined string data that will be used to create our JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword


const secret = "CourseBookingAPI";



module.exports.createAccessToken = (user) => {
    const data = {
        id : user._id,
        email : user.email,
        isAdmin : user.isAdmin
    }
    return jwt.sign(data, secret)
}

// Allows the application to proceed with the next middleware function/callback function in the route
// The verify method will be used as a middleware in the route to verify the token before proceeding to the function that invokes the controller function


module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if(typeof token !== "undefined"){
        console.log(token);
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (err, data) =>{
            if(err) {
                return res.send({ auth: "failed"})
            }else {
                next()
            }
        })
    }else{
        return res.send({ auth : "Please login first"})
    }

}

module.exports.decode = (token) => {
    // let token = req.headers.authorization;

    if(typeof token !== "undefined"){
        console.log(token);
        token = token.slice(7, token.length);
        return jwt.verify(token, secret, (err, data) =>{
            if(err) {
                return null;
            }else {
                return jwt.decode(token, {complete: true}).payload
            }
        })
    }else {
        return null;
    }
}