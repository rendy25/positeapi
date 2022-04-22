const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const resResult = require('../utils/Response.Utils')
const {getUserC, createUser, authUser} = require('../controllers/User.Controller')
const { verifyApp, verifyUser } = require('../middleware/auth');
let jsonParser = bodyParser.json()
let bodyUrlEncode = bodyParser.urlencoded({ extended: true })
router.use(jsonParser)
router.use(bodyUrlEncode)

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
   //const user = req.user.username
   //if(user != 'azam3') resResult(403, 'Not Allowed', res)
   try {
     const insert = await createUser(req.body)
     //console.log(insert['code']);
     /*if (insert['code'] != 200){
         console.log('1');
     }else{
         console.log('2');
     }*/
     resResult(insert.code, insert.data, res)
   } catch (err) {
      next(err)
   }
   
})

router.post('/auth', verifyApp, async(req,res,next) => {
   try{
       const auth = await authUser(req.body)
       const token = {token: auth.data}
       resResult(auth.code, token, res)
   } catch(err) {
      next(err)
   }
})

module.exports = router


