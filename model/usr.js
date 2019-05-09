const mysql = require('../config/connect_mysql');

module.exports = async (val)=>{
    const _searchSql = `SELECT * FROM usr WHERE usr_no="${val.name}"`;
    const _recommendSql = `SELECT * FROM usr WHERE flag=1`
    const _addSql = `INSERT INTO usr(usr_no,usr_psw) values (?,?)`;
    const _setFlagSql = `UPDATE usr SET flag=1 where usr_no="${val.name}"`
    let info;
    
    switch(val.type){
        case "recommend": info = await mysql.query(_recommendSql);break;
        case "sign-in": info =  await mysql.query(_searchSql);break;
        case "sign-up": info =  await mysql.query(_addSql,[val.name,val.psw]);break;
        case "set-flag": info =  await mysqS.query(_setFlagSql);break;
    }
    return info;
}

