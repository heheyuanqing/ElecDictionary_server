const mysql = require('../config/connect_mysql');

//创建个人词库及对个人词库的增删查
module.exports = async function (val) {
  const id = await mysql.query("SELECT usr_id  FROM usr where usr_no=?", val.name)
  const wordsName = "word_" + id[0].usr_id
  const word = await mysql.query(`select * from words where en="${val.word}"`);
  const _buildSql = `CREATE TABLE ${wordsName} (
    id int(11) NOT NULL  AUTO_INCREMENT primary key,
    word_id int(11) NOT NULL,
    en varchar(20) NOT NULL,
    cn varchar(200)NOT NULL,
    uk varchar(20)NOT NULL,
    us varchar(20)NOT NULL,
    process int(11) NOT NULL  DEFAULT -1 COMMENT '类型：-1为未学习，0开始学习，1为认识阶段，2为熟悉阶段，3为掌握阶段',
    wrong_times int(11) NOT NULL DEFAULT 0 COMMENT '错误次数',
    FOREIGN KEY(word_id) REFERENCES words(id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户单词库';`
  const _insertSql = `INSERT INTO ${wordsName}(word_id,en,cn,uk,us) values (?,?,?,?,?)`
  const _deleteSql = `DELETE FROM ${wordsName} where en="${val.en}"`
  const _getWordsSql = `select * from ${wordsName};`
  // 获取测试单词--process为3且按wong_times从大到小排序
  const _getTestWordSql = `select * from ${wordsName} where process=3 order by wrong_times desc`
  const _getStuWordSql = `select * from ${wordsName} where process=-1 limit 5`
  
  if(val.word && val.word.process ){
    const _updateStuProcessSql = `UPDATE ${wordsName} SET process=${val.word.process},wrong_times=${val.word.wrong_times} where word_id="${val.word.id}"`
    const  _updateTestProcessSql = `UPDATE ${wordsName} SET wrong_times=${val.word.wrong_times} where word_id="${val.word.id}"`  
  }
 
  let res;
  switch (val.type) {
    case 'create': res = await mysql.query(_buildSql); break;
    case 'get': res = await mysql.query(_getWordsSql); break;
    case 'add': res = await mysql.query(_insertSql,[word[0].id,word[0].en,word[0].cn,word[0].uk,word[0].us]); break;
    case 'delete': res = await mysql.query(_deleteSql); break;
    case 'update-stu-process' :res = await mysql.query(_updateStuProcessSql) ;break;
    case 'update-test-process': res = await mysql.query(_updateTestProcessSql) ;break;
    case 'test-word': res = await mysql.query(_getTestWordSql);break;
    case 'stu-word': res = await mysql.query(_getStuWordSql);break;
  }
  return res;
}