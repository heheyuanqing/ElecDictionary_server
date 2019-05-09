const mysql = require('../config/connect_mysql');

module.exports = async (val)=>{
    let _insertSql = `INSERT INTO words(en,cn) values (?,?)`;
    let _deleteSql = `DELETE FROM words where en="${val.en}"`;
    let _searchSql = `SELECT * From words where en="${val.en}" `;
    
    let _searchByIdSql = `SELECT * From words where id="${val.id}" `;
    let info;
  
    switch(val.type){
        case "insert":  info =  await mysql.query(_insertSql,[val.en,val.cn,val.uk,val.us]);break;
        case "delete":  info =  await mysql.query(_deleteSql);break;
        case "search":  info =  await mysql.query(_searchSql);break;
        case "search-by-id":  info =  await mysql.query(_searchByIdSql);break;

    }
    return info;
}