const { addSource, getSource, getCatgory, getList } = require("../models/Source.Model");
const { encrypt } = require("../utils/Encrypt");

const add = async (body) => {
     const { title, email, framework_id, category_id, filename, preview_imgurl } = body;

     const result = { code: 500 };

     const payload = {
          title,
          email,
          framework_id,
          category_id,
          filename,
          source_statusid: 'PO1',
          preview_imgurl
     }

     try {
          await addSource(payload);
          const inserted = await getSource(filename);
          if(inserted){
               result.inserted = inserted[0];
          }

          result.code    = 200;
          result.global  = "OK";
     } catch (error) {
          console.log(error);
          result.code    = 400;
          result.global  = "Insert failed";
          result.error   = error;    
     }
     
     return { code: result.code, data: result };
}

const category = async (body) => {
     const result = { code: 500 };

     try {
          const get = await getCatgory(body.framework);
          if(get){
               result.code = 200;
               result.result = get
          }else{
               result.code = 400;
               result.global = "Not found";
          }
     } catch (error) {
          console.log({ error });
     }

     return { code: result.code, data: result };
}

const list = async (body) => {
     const result = { code: 500 };

     const payload = {
          framework: parseInt(body.framework),
          category: body.category
     }

     try {
          const get = await getList(payload);
          if(get){
               const listData = [];
               get.forEach(row => {
                    listData.push({
                         id: encrypt(row.id.toString()).encryptedData,
                         componentid: row.category_id,
                         frameworkid: row.framework_id,
                         title: row.title,
                         author: `${row.firstname} ${row.lastname}`,
                         img: process.env.APP_HOST + '/uploads/' + row.preview_imgurl,
                         code: process.env.APP_HOST + '/code/' + row.filename,
                         person: row.imageurl 
                    })
               })

               result.code    = 200;
               result.msg     = "OK";
               result.result  = listData;
          }else{
               result.code = 404;
               result.msg = "Not found";
               result.error = error;
          }
     } catch (error) {
          console.log({ error });
          result.code = 400;
          result.msg = "Somthing wrong";
          result.error = error;
     }

     return { code: result.code, data: result };
}

module.exports = {
     add,
     category,
     list
}