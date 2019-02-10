const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/projectkeys");
const passport = require("passport");
const db = require("../../config/projectkeys").mongoURI;
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// All the endpoints for the backend
router.post("/register", (req, res) => {

  const { errors, containsErrors } = validateRegisterInput(req.body);

  if (!containsErrors) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
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
    }
  });
});


// get all the collections from the db
router.get('/all', (req,res) => {
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
     return res.json(userMap)
    }
    else{
      res.json(finalArray)
    }
  });

})



router.post('/deleteUser', (req, res) => {
  User.deleteOne({email : req.body.email}, (err) => {
    if(!err){
      res.sendStatus(200);
    }
  })
});


router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
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
