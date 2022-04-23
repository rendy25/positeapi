const db = require('../utils/DbConnection');

const addSource = (data) => {
     return db('t_sources').insert(data);
}

const getSource = (filename) => {
     return db
     .select('a.id', 'a.source_statusid','d.description', 'a.title', 'a.filename', 'a.preview_imgurl', 'a.created_at', 'c.category_name', 'b.framework_name', 'a.framework_id', 'a.category_id')
     .from('t_sources as a')
     .join('r_framework as b', 'a.framework_id', '=', 'b.framework_id')
     .join('r_category as c', 'a.category_id', '=', 'c.category_id')
     .join('r_source_state as d', 'a.source_statusid', '=', 'd.source_statusid')
     .where('a.filename', filename);
}

const getCatgory = (framework) => {
     return db.raw('EXEC sp_getcategory ?', [framework]);
}

const getList = (param) => {
     if(param.framework === 41){ //all framework
          return db
          .select('a.id', 'a.title', 'a.filename', 'a.preview_imgurl', 'b.imageurl', 'b.firstname', 'b.lastname', 'a.category_id', 'a.framework_id')
          .from('t_sources as a')
          .join('t_users as b', 'a.email', '=', 'b.email')
          .where('a.category_id', param.category)
     }else{
          return db
          .select('a.id', 'a.title', 'a.filename', 'a.preview_imgurl', 'b.imageurl', 'b.firstname', 'b.lastname', 'a.category_id', 'a.framework_id')
          .from('t_sources as a')
          .join('t_users as b', 'a.email', '=', 'b.email')
          .where('a.framework_id', param.framework)
          .where('a.category_id', param.category)
     }
}

module.exports = { addSource, getSource, getCatgory, getList }