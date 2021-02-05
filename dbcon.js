var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'oniddb.cws.oregonstate.edu',
  user            : 'vangemed-db',
  password        : 'otiv3iLCKv6bVk8B',
  database        : 'vangemed-db'
});

module.exports.pool = pool;