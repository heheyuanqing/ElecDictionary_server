const mysql = require('../config/connect_mysql');

module.exports = async (val)=>{
    let _insertSql = `INSERT INTO errmsg(en,cn) values (?,?)`;
    let _deleteSql = `DELETE FROM words where en="${val.en}"`;
    let _searchSql = `SELECT * From words`;

    let info;
  
    switch(val.type){
        case "insert":  info =  await mysql.query(_insertSql,[val.en,val.cn]);break;
        case "delete":  info =  await mysql.query(_deleteSql);break;
        case "search":  info =  await mysql.query(_searchSql);break;
    }
    return info;
}