const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};


  console.log(data.email);
  // Because the validator functions works in Strings only
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "The Name field is required";
  }

  if(data.email == "admin@admin.com"){
    errors.message = "Sorry, this is reserved the admin";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "The Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "The Email Syntax is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "The Password field is required";
  }

if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }

return {
    errors,
    containsErrors: isEmpty(errors)
  };
};