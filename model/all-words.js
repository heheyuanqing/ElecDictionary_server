const mysql = require('../config/connect_mysql');

let handleWords = async (val)=>{
    let _insertSql = `INSERT INTO words(en,cn,uk,us) values (?,?,?,?)`;
    let _deleteSql = `DELETE FROM words where en="${val.en}"`;
    let _searchSql = `SELECT * From words where en="${val.en}" `;
    
    let info;
    //TODO 根据管理员不同的操作选择进行数据库对应的操作
    //添加、删除、更新
    switch(val.type){
        case "insert":  info =  await mysql.query(_insertSql,[val.en,val.cn,val.uk,val.us]);break;
        case "delete":  info =  await mysql.query(_deletetSql);break;
        case "insert":  info =  await mysql.query(_insertSql,[val.en,val.cn,val.uk,val.us]);break;
        case "search":  info =  await mysql.query(_searchSql);break;
    }
    return info;
}

module.exports = {
    handleWords
};