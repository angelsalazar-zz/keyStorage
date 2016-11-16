// Dependecies
var mongoose = require('mongoose');


// Getting Schema object
var Schema  = mongoose.Schema;

// KeySchema definition
var KeySchema = new Schema({
  provider : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true,
    select : false
  },
  created : {
    type : Date,
    default : Date.now
  }
});

// ProjectSchema
var ProjectSchema = new Schema({
  _user : { type: Schema.Types.ObjectId, ref: 'User' },
  name : {
    type : String,
    required : true
  },
  description : String,
  created : {
    type : Date,
    default : Date.now
  },
  keys : [KeySchema]
});

// before save the key, encrypt key's password
KeySchema.pre('save',function(next){
  var key = this;
  // If the key password has not been updated
  if(!key.isModified('password')) return next();

  //http://stackoverflow.com/questions/22546458/how-do-i-create-an-encrypt-and-decrypt-function-in-nodejs
  // If key password has been updated, then hash it
  // bcrypt.hash(key.password, null, null, function(err, hash) {
  //     if(err) return next(err);
  //
  //     key.password = hash;
  //     next();
  // });
})

module.exports = mongoose.model('Project', ProjectSchema);
