// Dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Getting Schema object
var Schema = mongoose.Schema;

// UserSchema definition
var UserSchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  lastname : String,
  email : {
    type : String,
    required : true,
    index : {
      unique : true
    }
  },
  password : {
    type : String,
    required : true,
    select : false            // when querying user, exclude user's password
  },
  projects : [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

// before save the user, encrypt user's password
UserSchema.pre('save',function(next){
  var user = this;
  // If the user's modified wasn't modified
  if(!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
      if(err) return next(err);

      user.password = hash;
      next();
  });
})
// Compare user password, when logging
UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
}
// Export the file
module.exports = mongoose.model('User', UserSchema);
