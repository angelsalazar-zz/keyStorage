// Dependecies
var jwt = require('jsonwebtoken');

// Model
var User  = require('../database/models/user');

// Server config
var config = require('../../config');

// Getting secretKey
var secretKey = config.secretKey;

// Helpers

/**
* _createToken
* @param user Object
* @return String
*/

// Create token from user
function _createToken(user){
  // Signing user info based on secretKey
  var token = jwt.sign({
    _id : user._id,
    name : user.name,
    email : user.email
  },secretKey,{
    expiresIn : 86400
  })
  return token;
}

// Sign up Handler
var signUp = function(req, res){
  // Create User
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  },function(err, user){
    var response = { status : 200 , content : ''}
    if(err){
      response.status = 400;
      response.content = err;
    }else{
      response.status = 200;
      response.content = { token : _createToken(user) };
    }
    res
      .status(response.status)
      .json(response.content);
  })
}
// Log in handler
var logIn = function(req, res){
  // Gettimg sent credentials
  var email =  req.body.email;
  var password = req.body.password;
  // Retrieving User info by email
  User
    .findOne(
      { email : email },
      'name email password',
      function(err, user){
        // response obect
        var response = { status : 200 , content :  '' };
        if(err){
          response.status = 500,
          response.content = err;
        }else if(!user){
          response.status = 403;
          response.content = { message : "User doesn't exist" };
        }else{
          var validPassword = user.comparePassword(password);
          if(!validPassword){
            response.status = 403;
            response.content = { message : "Invalid credentials" };
          }else{
            response.content = { token : _createToken(user) };
          }
        }
        res
          .status(response.status)
          .json(response.content);
      });
}

// Authtoken middleware handler
var authToken = function(req,res,next){
  // Check if token was provided (token sent in the request object, in the url and as header)
  var token = req.body.token || req.param.token || req.headers['x-access-token'];
  // If token exists, then verify if token is valid
  // else, send json reponse
  if(token){
    jwt.verify(
      token,
      secretKey,
      function(err,decoded){
        if(err){
          res.status(403).json({sucess: false, message: "Failed to authenticate user"});
        }else{
          req.decoded = decoded;
          next();
        }
      });
  }else{
    res.status(403).json({success: false, message: "No token provided"});
  }
}

// Export Auth Controller
module.exports = {
  signUp : signUp,
  logIn : logIn,
  authToken : authToken
};
