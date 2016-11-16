// Dependencies

// Models
var Project = require('../database/models/project');

var create = function(req, res){
  var _user = req.decoded._id;
  Project
    .create({
      _user : _user,
      name : req.body.name,
      description :  req.body.description || ''
    }, function(err, project){
      var response = { status : 200, content : '' };
      if(err){
        response.status = 400;
        response.content = err;
      }else{
        response.content = project;
      }
      res
        .status(response.status)
        .json(response.content);
    })
};
var all = function(req, res){
  var _user = req.decoded._id;

  Project
    .find(
      { _user : _user },
      '-keys',
      function(err, projects){
        var response = { status : 200, content : '' };
        if(err){
          response.status = 500;
          response.content = err;
        } else {
          response.content = projects;
        }
        res
          .status(response.status)
          .json(response.content);
      })
};
var getById = function(req, res){
  var id = req.params._id;
  Project
    .findById(
      id,
      function(err, project){
        var response = {status : 200, content : '' };
        if (err) {
          response.status = 500;
          response.content = err;
        } else if(!project) {
          response.status = 404;
          response.content = { message : 'Project ' + id + ' not found.' };
        } else {
          response.content = project;
        }
        res
          .status(response.status)
          .json(response.content);
      })
    // .populate('keys')
    // .exec(function(err, project){
    //   var response = {status : 200, content : '' };
    //   if(err){
    //     response.status = 500;
    //     response.content = err;
    //   } else if(!project) {
    //     response.status = 404;
    //     response.content = { message : 'Project ' + id + ' not found.' };
    //   } else {
    //     response.content = project;
    //   }
    //   res
    //     .status(response.status)
    //     .json(response.content);
    // });
};

var updateById = function(req, res){
  var id = req.params._id;
  Project
    .findByIdAndUpdate(
      id,
      { $set : req.body },
      { new : true },
      function(err, project){
        var response = { status : 200, content : '' };
        if(err){
          response.status = 500;
          response.content = err;
        } else if(!project) {
          response.status = 404;
          response.content = { message : 'Project ' + id + ' not found.' };
        } else {
          response.content = project;
        }
        res
          .status(response.status)
          .json(response.content);
      });
};
var deleteById = function(req, res){
  var id = req.params._id;
  Project
   .findByIdAndRemove(
     id,
     function(err, project){
       var response = { status : 204, content : '' };
       if(err){
         response.status = 500;
         response.content = err;
       } else if (!project) {
         response.status = 404;
         response.content = { message : 'Project ' + id + ' not found.' };
       }
       res
         .status(response.status)
         .json(response.content);
     })
}
module.exports = {
  create : create,
  all : all,
  getById : getById,
  updateById : updateById,
  deleteById : deleteById
};
