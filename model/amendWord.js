const mysql = require('../config/connect_mysql');

let amend = async (val)=>{
    let _insertSql = `INSERT INTO words(en,cn,uk,us) values (?,?,?,?)`;
    let _deleteSql = `DELETE FROM words where en="${val.en}"`;
    let infor;
    //TODO 根据管理员不同的操作选择进行数据库对应的操作
    //添加、删除、更新
    switch(val.type){
        case "insert":  infor =  await mysql.query(_insertSql,[val.en,val.cn,val.uk,val.us]);
        case "delete":  infor =  await mysql.query(_deletetSql);
        case "insert":  infor =  await mysql.query(_insertSql,[val.en,val.cn,val.uk,val.us]);
  
    }
    return infor;
}

module.exports = {
    amend
};