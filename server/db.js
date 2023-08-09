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
     pack: {
          check: {
               time: (id) => conn.query(`SELECT last_pack FROM users WHERE id = '${id}'`),
               oldPack: (id) => conn.query(`SELECT * FROM packs WHERE owner_id = '${id}'`),
          },
          create: (id) => {
               var pack_id = -1;

               conn.query(`INSERT INTO packs (owner_id) VALUES (${id})`)
               .then((result) => {
                    pack_id = result.insertId;

                    return conn.query(`SELECT id FROM cards
                                       WHERE owner_id IS NULL
                                       AND pack_id IS NULL
                                       ORDER BY RAND()
                                       LIMIT 5`);
               })
               .then((cards) => {
                    const promises = [];

                    for (const card of cards) {
                         promises.push(
                         conn.query(`UPDATE cards
                                   SET pack_id = ${pack_id}
                                   WHERE id = ${card.id}`)
                    );
                    }

                    return Promise.all(promises);
               })
          }
     },
     admin: {
          createUser: (username, email, pass_hash) => conn.query(`INSERT INTO users (username, email, pass_hash) VALUES ('${username}', '${email}', '${pass_hash}')`)
               .then(() => 'good')
               .catch(() => 'bad'),
     }
};

module.exports =  dbFuncs;