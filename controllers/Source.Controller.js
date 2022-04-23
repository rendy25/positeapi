const { addSource, getSource } = require("../models/Source.Model");

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

module.exports = {
     add
}