// importing the database
const User = require('../models/userSchema');

exports.home = (req,res) => {
    res.status(201).json({"message":"on home route"});
}

exports.createUser = async (req,res) => {

    try {
         // fetch the data
       const {name,email} = req.body;
       // check if all data is entered
          if(!(name && email))
          {
               res.status(401).json({
                   "success":"false",
                   "message":"data insufficient"
               });
          }
       // check if user already exists
          const existUser = await User.findOne({email});
   
          if(existUser)
          {
              res.status(401).json({
                "success":"false",
                "message":"User already exist"
              })
          }
   
       // create user and send response
   
       const user = await User.create({name,email});
       res.status(200).send({
           "success":"true",
           "message":"user created",
            user
       })
   
        
    } catch (err) {
        console.log(err.message);
    }

   }

exports.allusers = async (req,res) => {
    // fetch all users and return response

    try {
        const users = await User.find();
        res.status(201).json({
            "success":true,
            users
        })
    } catch (err) {
        console.log(err.message);
    }
}


exports.updateuser = async (req,res) => {
    try {
         const user = await User.findByIdAndUpdate(req.params.id,req.body);
         res.status(201).json({
        "success":true,
        "message":"user updated",
         user
    })
        
    } catch (err) {
        res.status(402).json({
            "success":false,
            "message":err.message
        })
    }
    
}

exports.deleteuser = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        res.status(201).json({
            "success":true,
            "message":"user deleted successfully"
        })
        
    } catch (err) {
        res.status(402).json({
            "success":false,
            "message":err.message
        })
    }
}