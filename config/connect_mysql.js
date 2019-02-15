const mysql = require('mysql');

const pool = mysql.createPool({
    user:"root",
    password:"123456",
    database:"dictionary",
    host:"localhost",
    port:3306
});

let query = (sql,val)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connect)=>{
            if(err){
                reject(err);
            }
            else{
                connect.query(sql,val,(err,res)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                });

                connect.release();
            }
        });
    })
};

module.exports={
    query
};