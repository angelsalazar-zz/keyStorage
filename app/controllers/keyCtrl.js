// Models
var Project = require('../database/models/project');
//Helpers
function _addKey(req, res, project){
  project.keys.push({
    provider : req.body.provider,
    email : req.body.email,
    password : req.body.password,
    description : req.body.description || ''
  });
  project.save(function(err, project){
    var response = { status : 200, content : '' };
    if(err){
      response.status = 400;
      response.content = err;
    } else {
      response.content = project.keys[ project.keys.length - 1 ];
    }
    res
      .status(response.status)
      .json(response.content);
  });
};

// var all = function (req, res) {
//
// };

var create = function (req, res) {
  var projectId = req.params._projectId;
  Project
    .findById(
      projectId,
      function(err, project){
        var response = {status : 200, content : '' };
        if(err){
          response.status = 500;
          response.content = err;
        } else if(!project) {
          response.status = 404;
          response.content = { message : 'Project ' + id + ' not found.' };
        }

        if(project){
          _addKey(req, res, project);
        } else {
          res
            .status(response.status)
            .json(response.content);
        }
      });
};

var getById = function (req, res) {
  var projectId = req.params._projectId;
  var keyId = req.params._keyId;

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
            response.content = thiskey;
          }
        }
        res
          .status(response.status)
          .json(response.content);
      });
};

var updateById = function (req, res) {

};

var deleteById = function (req, res) {
  var projectId = req.params._projectId;
  var keyId = req.params._keyId;

  Project
    .findById(
      projectId,
      'keys',
      function(err, project){
        var response = { status : 200, content : '' };
        if (err) {
          response.status = 500;
          response.content =  err;
        } else if (!project){
          response.status = 404;
          response.content = { message : 'Project ' + projectId + ' not found.' };
        } else {
          thisKey = project.keys.id(keyId);
          if(!thisKey){
            response.status = 404;
            response.content = { message : 'Key ' + keyId + ' not found.' };
          }
        }

        if (response.status !== 200 ) {
          res
            .status(response.status)
            .json(response.content);
        } else {
          project.keys.id(keyId).remove();
          project.save(function(err, project){
            if (err) {
              response.status = 500;
              response.content = err;
            }
            res
              .status(response.status)
              .json(response.content);
          })
        }
      });

};


module.exports = {
  // all : all,
  create : create,
  getById : getById,
  updateById : updateById,
  deleteById : deleteById
}
