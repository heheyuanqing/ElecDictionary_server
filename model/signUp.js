const mysql = require('../config/connect_mysql');

let usr = async (val)=>{
    let _sql = `INSERT INTO usr(usr_no,usr_psw) values (?,?)`;

    let res =  await mysql.query(_sql,[val.name,val.psw]);
    return res ;
}

module.exports = {
    res
};