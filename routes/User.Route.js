const express = require('express');
const router = express.Router();
const resResult = require('../utils/Response.Utils')
const {getUserC, createUser, authUser} = require('../controllers/User.Controller')
const { verifyApp, verifyUser } = require('../middleware/auth');
const validator = require('validator');

const validate = (body) => {
   const { level, firstname, lastname, email, imageurl } = body;

   const errors = {};
  
   if(!email) errors.email = "Email is required";
   if(email && !validator.isEmail(email)) errors.email = "Invalid email";
   if(!firstname) errors.firstname = "Firstname is required";
   if(!lastname) errors.lastname = "Lastname is required";
   if(!level) errors.level = "Level is required";
   if(!imageurl) errors.imageurl = "Image url is required";

   return errors;
}

router.get('/', verifyApp, verifyUser, async(req, res, next) => {
   console.log(req.user);
    try{
      //  with callback function
      //   await getUserC(req, (code, data) => {
      //      const dataUser =  {datauser:data}
      //      resResult(code, dataUser, res)
      //   })
      const user = await getUserC()
      resResult(user.code, user.data, res)
     } catch(err) {
        next(err)
     }
})

//router.post('/createUser', verifyApp, verifyUser, async (req,res,next)=> {
router.post('/createUser', verifyApp, async (req,res,next)=> {
   const errors = validate(req.body);
   if(Object.keys(errors).length === 0){
      try {
         const insert = await createUser({ ...req.body, statusid: 1 });
         resResult(insert.code, insert.data, res)
       } catch (err) {
          next(err)
       }
   }else{
      resResult(400, errors, res);
   }
   
})

router.post('/auth', verifyApp, async(req,res,next) => {
   try{
       const auth = await authUser(req.body)
       const token = {token: auth.data}
       resResult(auth.code, token, res)
   } catch(err) {
      console.log({ err });
      next(err)
   }
})

module.exports = router


