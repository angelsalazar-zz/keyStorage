// Dependecies

// Models
var User = require('../database/models/user');

var getById = function (req, res) {
  // Getting user id from url
  var userId = req.params._id;
  User
    .findById(
      userId,
      '-projects',
      function (err, user) {
        // response object
        var response = { status : 200, content : '' };
        if (err) {
          response.status = 500;
          response.content = err;
        } else if (!user) {
          response.status = 404;
          response.content = { message : 'User ' + userId + ' not found.' };
        } else {
          response.content = user;
        }
        // Send json response
        res
          .status(response.status)
          .json(response.content);
      });
};

var updateById = function (req, res) {

};


module.exports = {
  getById : getById,
  updateById : updateById
};
