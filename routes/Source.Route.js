const express = require("express");
const router = express.Router();
const resResult = require('../utils/Response.Utils');
const { add } = require('../controllers/Source.Controller')
const { encrypt } = require('../utils/Encrypt')
const { verifyApp, verifyUser } = require('../middleware/auth');
const multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, __basedir + "/assets/uploads/");
     },
     filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
     }
})
    
var upload = multer({ storage: storage, limits: { fieldSize: 20 * 1024 * 1024 } }).array('source', 2); //20MB

const validate = (body) => {
     const error = {};
     if(!body.email) error.email = "Email is required";
     if(!body.title) error.title = "Title is required";
     if(!body.category_id) error.category_id = "Category id is required";
     if(!body.framework_id) error.framework_id = "Framework id is required";
     return error;
}

//note file is multiple
//for code is first file
//for preview is last file
router.post("/upload", verifyApp, verifyUser, async function(req, res, next) {
     upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
               resResult(400, {global: "Upload failed"} , res);
          }else{
               if(req.files){
                    const encryptedFile = [];

                    req.files.map(row => {
                         const { destination, path, originalname } = row;
                         var fileType   = originalname.split('.');
                         var newName    = encrypt(req.body.email).encryptedData + '.' + fileType[fileType.length - 1];
                         
                         fs.renameSync(path, destination + newName);

                         encryptedFile.push({ filename: newName, path, destination: destination + newName });
                    })

                    const errors = validate(req.body);
                    if(Object.keys(errors).length === 0){
                         add({ 
                              ...req.body, 
                              filename: encryptedFile[0].filename, 
                              preview_imgurl: encryptedFile.length >= 1 ? encryptedFile[1].filename : undefined 
                         })
                         .then(({ code, data }) => {     
                              if(code !== 200){
                                   encryptedFile.map(row => {
                                        fs.unlinkSync(row.destination); //remove file
                                   })
                              }    

                              resResult(code, data, res);
                         })
                         .catch(err => {
                              encryptedFile.map(row => {
                                   fs.unlinkSync(row.destination); //remove file
                              })
                              resResult(400, { global: 'Insert failed' }, res);
                         });
                    }else{
                         encryptedFile.map(row => {
                              fs.unlinkSync(row.destination); //remove file
                         })

                         resResult(400, errors, res);
                    }
               }else{
                    resResult(400, {global: 'Inavlid destinaion file' } , res);
               }
          }

     });
})

module.exports = router;