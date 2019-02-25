const mysql = require('../config/connect_mysql');

let amend = async (val)=>{
    let _sql = `SELECT * FROM usr WHERE usr_no="${name}"`;

    let infor =  await mysql.query(_sql);
    return infor;
}

module.exports = {
    amend
};