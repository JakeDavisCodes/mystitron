const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost',
     user:'',
     password: 'myPassword',
     connectionLimit: 1
});