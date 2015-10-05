var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    validate = require('mongoose-validator'),
    Schema   = mongoose.Schema;

/* ===============
 mongoose-validator
 =============== */
var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 50],
    message  : 'Name should be between 2 and 50 characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message  : 'This is not valid email'
  })
];

var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 10],
    message  : 'Password should be between 6 and 10 characters'
  })
];

/* ===============
 User schema
 =============== */

var UserSchema = new Schema({
  email   : {
    type    : String,
    unique  : true,
    validate: emailValidator
  },
  name    : {
    type    : String,
    validate: nameValidator
  },
  password: {
    type    : String,
    validate: passwordValidator
  }
});

UserSchema.path('name').required(true, 'name is required');
UserSchema.path('password').required(true, 'password is required');
UserSchema.path('email').required(true, 'email is required');

/* ===============
 Methods
 =============== */

UserSchema.methods.generateHash = function( password ) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function( password ) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function( next ) {
  if( this.password ) {
    this.password = this.generateHash(this.password);
  }
  next();
});

/* ===============
 Delete password on return user
 =============== */
UserSchema.set('toJSON', {
  transform: function( doc, user ) {
    delete user._id;
    delete user.password;
    return user;
  }
});

/* ===============
 Validations
 =============== */

UserSchema.path('email').validate(function( email, done ) {
  if( email ) {
    this.model('User').count({ 'email': email }, function( err, count ) {
      if( err ) {
        return done(err);
      }
      // need to return false if failed
      done(!count);
    });
  }

}, 'Email already exists');

module.exports = mongoose.model('User', UserSchema);