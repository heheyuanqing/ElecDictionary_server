const mysql = require('../config/connect_mysql.js'); 

let mean = async (word)=>{
    let _sql = `SELECT * From words where en="${word}" `;
    let res = await mysql.query(_sql);
     return res;
}

module.exports={
    mean
};