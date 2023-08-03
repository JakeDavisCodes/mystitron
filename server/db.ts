const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASS,
     connectionLimit: 1
});

var conn;

pool.getConnection()
     .then((connection) => {
          conn = connection
          console.log('connection made')
          connection.query('USE mystitron')
     })

const dbFuncs = {
     test: () => conn.query('SELECT * FROM USERS')
          .then((rows) => rows[0]),
     admin: {
          createUser: (username, email, pass_hash) => conn.query(`INSERT INTO users (username, email, pass_hash) VALUES ('${username}', '${email}', '${pass_hash}')`)
               .then(() => 'good')
               .catch(() => 'bad'),
     }
};

module.exports =  dbFuncs;