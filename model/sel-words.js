const mysql = require('../config/connect_mysql');

//创建个人词库及对个人词库的曾删改查
module.exports = async function(val){
    let words = "word_"+mysql.query("SELECT id FROM usr where usr_no=?",val.name)
    let _buildSql = `CREATE TABLE "${words}" (
        word_id int(11) NOT NULL  PRIMARY KEY,
        flag int(11) NOT NULL  DEFAULT 0 COMMENT '类型：0为搜索单词，1为个人词库单词',
       -- FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户单词列表';`,
      _insertSql = ``,
      _deleteSql=``;

    let res;
    switch(val.type){
        case 0:mysql.query();
        case 1:mysql.query();
        case 2:mysql.query();
    }

    return res;

}