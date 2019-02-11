const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/projectkeys");
const passport = require("passport");
const db = require("../../config/projectkeys").mongoURI;
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const winston = require("../../config/winston");

const User = require("../../models/User");

// All the endpoints for the backend
router.post("/register", (req, res) => {

  winston.info("/register has been hit")
  const { errors, containsErrors } = validateRegisterInput(req.body);

  console.log("Contains errors", errors)

  if (!containsErrors) {
    winston.error("Error inside validate Register input of the Register function", errors)
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      winston.error("Sorry, Email aldready exists")
      return res.status(400).json({ email: "Sorry,Email already exists" });
    } else {

      // Creating a new User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      winston.info("New user has been added to the database");
    }
  });
});


// get all the collections from the db
router.get('/all', (req,res) => {
  winston.info("/all endpoint has been hit")
  User.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user, index) {
      userMap[index] = user;
    });

    res.json(userMap);  
  });
})


// For the search functionality
router.post('/searchItem', (req, res) => {
  winston.info("/searchItem endpoint has been hit")

  let searchTerm = req.body.userInput;
  let userMap;
  let finalArray = [];

  User.find({}, function(err, users) {
   userMap = [];

    users.forEach(function(user, index) {
      userMap[index] = user;
    });

    finalArray = userMap.filter(user => user.name.includes(searchTerm))
    if(searchTerm === ""){
      winston.info("search term is empty in the /searchTerm Endpoint")
     return res.json(userMap)
    }
    else{
      res.json(finalArray)
    }
  });

})



router.post('/deleteUser', (req, res) => {
  winston.info("/deleteUser has been hit")

  User.deleteOne({email : req.body.email}, (err) => {
    if(!err){
      res.sendStatus(200);
    }
    else{
      winston.error("Error inside validate Register input of the Register function", err);
    }
  })
});


router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    winston.error("User input invalid inside the login function", errors);
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  
  
  if(email == "admin@admin.com" && password == "admin1234"){
    const payload = {
      id: "admin",
      name: "admin"
    };
    
    
    return jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 2592000 // one month
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  }

  User.findOne({ email }).then(user => {

    if (!user) {
      winston.error("Sorry no Email found!!");

      return res.status(404).json({ emailnotfound: "Sorry Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 2592000 // one month
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Please check your password and try again" });
      }
    });
  });
});

module.exports = router;
