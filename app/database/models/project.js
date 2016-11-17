// Dependecies
var mongoose = require('mongoose');
var encryptor = require('../../classes/encryptor/encryptor');

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

  key.password = encryptor.encrypt(key.password);
  next();
})

module.exports = mongoose.model('Project', ProjectSchema);
