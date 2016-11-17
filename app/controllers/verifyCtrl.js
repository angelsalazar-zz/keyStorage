// Dependencies
var encryptor = require('../classes/encryptor/encryptor');

// Models
var User    = require('../database/models/user');
var Project = require('../database/models/project');

// Helpers
var _getKeyPassword = function (req, res, projectId, keyId) {
  Project
    .findById(
      projectId,
      'keys',
      function(err, project){
        var response = { status : 200, content : '' };
        if (err) {
          response.status = 500;
          response.content = err;
        } else if (!project) {
          response.status = 404;
          response.content = { message : 'Project ' + projectId + ' not found.' };
        } else {
          thiskey = project.keys.id(keyId);
          if (!thiskey) {
            response.status = 404;
            response.content = { message : 'Key ' + keyId + ' not found.' };
          } else {
            response.content = { password : encryptor.decrypt(thiskey.password) };
          }
        }
        res
          .status(response.status)
          .json(response.content);
      });
};

var showPassword = function(req, res){
  var providedPassword  = req.body.password;
  var authUserEmail     = req.decoded.email;
  var projectId         = req.params._projectId;
  var keyId             = req.params._keyId;

  User
    .findOne(
      { email : authUserEmail },
      'password',
      function(err, user){
        // response object
        var response = { status : 200 , content :  '' };
        if(err){
          response.status = 500,
          response.content = err;
        }else if(!user){
          response.status = 403;
          response.content = { message : "User doesn't exist" };
        }else{
          var validPassword = user.comparePassword(providedPassword);
          if(!validPassword){
            response.status = 403;
            response.content = { message : "Your password does not Match !" };
          }
        }

        if(response.status !== 200 ){
          res
            .status(response.status)
            .json(response.content);
        } else {
          _getKeyPassword(req, res, projectId, keyId);
        }
      });
};

module.exports = {
  showPassword : showPassword
};
