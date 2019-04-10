const mysql = require('../config/connect_mysql');

module.exports = async (val)=>{
    let _searchSql = `SELECT * FROM usr WHERE usr_no="${val.name}"`;
    let _addSql = `INSERT INTO usr(usr_no,usr_psw) values (?,?)`;
    let info;
    
    switch(val.type){
        case "sign-in": info =  await mysql.query(_searchSql);break;
        case "sign-up": info =  await mysql.query(_addSql,[val.name,val.psw]);break;
    }
    return info;
}

