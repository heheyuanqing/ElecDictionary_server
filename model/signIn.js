const mysql = require('../config/connect_mysql');

let usr = async (val)=>{
    let _sql = `SELECT * FROM usr WHERE usr_no="${val}"`;

    let infor =  await mysql.query(_sql);
    return infor;
}

module.exports = {
    usr
};