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
          create: (id, currentTime) => {
               var pack_id = -1;
               var pack;

               return conn.query(`INSERT INTO packs (owner_id) VALUES (${id})`)
               .then((result) => {
                    pack_id = result.insertId;

                    return conn.query(`SELECT * FROM cards
                                       WHERE owner_id IS NULL
                                       AND pack_id IS NULL
                                       ORDER BY RAND()
                                       LIMIT 5`);
               })
               .then((cards) => {
                    const promises = [];
                    pack = cards;

                    for (const card of cards) {
                         promises.push(
                         conn.query(`UPDATE cards
                                   SET pack_id = ${pack_id}
                                   WHERE id = ${card.id}`)
                    );
                    }

                    return Promise.all(promises);
               })
               .then(() => conn.query(`UPDATE users
                                       SET last_pack = '${currentTime}'
                                       WHERE id = ${id}`))
               .then(() => pack)
          },
          get: (u_id) => conn.query(`SELECT id FROM packs WHERE owner_id = '${u_id}'`)
               .then((results) => {
                    if (results.length === 0) return;
                    return conn.query(`SELECT * FROM CARDS WHERE pack_id = '${results[0].id}'`)
               })
     },
     user: {
          check: (username, email) => conn.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`)
               .then((results) => results.length === 0 ? true : false),

          create: (username, email, pass_hash) => conn.query(`INSERT INTO users (username, email, pass_hash) VALUES ('${username}', '${email}', '${pass_hash}')`),
          signIn: (identifier, pass_hash) => conn.query(`SELECT * FROM users
                                                         WHERE (username = '${identifier}' OR email = '${identifier}')
                                                         AND pass_hash = '${pass_hash}'`)
     },
     session: {
          get: (s_id) => {
               conn.query(`SELECT * FROM sesh WHERE id = '${s_id}`)
          },
          create: (s_id, u_id) => {
               conn.query(`INSERT INTO sesh (id, u_id) VALUES ('${s_id}', '${u_id}')`)
          },
          delete: (s_id, u_id) => {
               conn.query(`DELETE FROM SESH WHERE u_id = '${u_id}' AND id != '${s_id}'`)
          }
     },
     admin: {
          createUser: (username, email, pass_hash) => conn.query(`INSERT INTO users (username, email, pass_hash) VALUES ('${username}', '${email}', '${pass_hash}')`)
               .then(() => 'good')
               .catch(() => 'bad'),
     }
};

module.exports =  dbFuncs;