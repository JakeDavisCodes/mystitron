const db = require('./db.js')
const generateFakeUsers = require('./fakeData/user.js').fakeUsers

const toTimestamp = (strDate) => Date.parse(strDate) / 1000;
const toDate = (timestamp) => {
  var date = '';
  const dateFormat = new Date(timestamp);

  date += (dateFormat.getFullYear() + '-');
  date += ((dateFormat.getMonth() + 1) + '-'); // Adding 1 to month since it's zero-based
  date += (dateFormat.getDate() + ' '); // Use getDate() instead of getDay() for day of the month
  date += (dateFormat.getHours() + ':');
  date += (dateFormat.getMinutes() + ':');
  date += dateFormat.getSeconds();

  return date;
};

const controllerFuncs = {
  test: (req, res) => {
    db.test()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.sendStatus(500))
  },
  user: {
    sign: {
      up: (req, res) => {
        const { username, email, pass_hash } = req.body

        db.user.check(username, email)
          .then((good) => {
            if(good) return db.user.create(username, email, pass_hash)
            else throw new Error('Email or Username already exists')
          })
          .then(() => res.sendStatus(201))
          .catch((err) => {
            console.error(err)

            if (err.message === 'Email or Username already exists') res.status(401).json({Unauthorized: err.message})
            else res.status(500).json(err)
          })
      },
      in: (req, res) => {
        const { identifier, pass_hash } = req.body;
        var s_id = Math.floor(Math.random() * 999999999);
        var u_id

        db.user.signIn(identifier, pass_hash)
          .then((results) => {
            u_id = results[0].id;

            if (results.length > 0) return db.session.create(s_id, u_id)
            else throw new Error('Incorrect Login')
          })
          .then(() => res.status(201).json({ s_id }))
          .then(() => db.session.delete(s_id, u_id))
          .catch((err) => {
            if (err.message === 'Incorrect Login') res.status(401).json({ Unauthorized: err.message })
            else res.status(500).json(err)
          })
      },
    },
    generatePack: (req, res) => {
      const id = req.params.user_id;
      const currentTime = new Date().getTime() / 1000;

      if (!id) {
        res.status(401).json({Unauthorized: 'ID required'})
        return;
      }

      db.pack.check.time(id)
        .then((result) => {
          const last_pack = toTimestamp(result[0].last_pack) || 0;

          if (last_pack === null || last_pack + 86400 < currentTime) return;
          throw new Error('Wait')
        })
        .then(() => db.pack.check.oldPack(id))
        .then((result) => {
          if (result.length === 0) return;
          throw new Error('Old Pack')
        })
        .then(() => db.pack.create(id, toDate(currentTime * 1000)))
        .then((result) => {
          console.log('step 2', result);
          res.status(201).json(result)
        })

        .catch((err) => {
          if (err.message === 'Wait' || err.message === 'Old Pack') res.status(401).json({Unauthorized: err.message})
          else res.status(500).json(err)
        })
    },
    getPack: (req, res) => {
      if (!req.params.user_id) {
        res.status(401).json({Unauthorized: 'ID required'})
        return;
      }

      db.pack.get(req.params.user_id)
        .then((results) => {
          if (!results) throw new Error('No Pack')
          res.status(200).json(results)
        })
        .catch((err) => {
          if (err.message === 'No Pack') res.status(401).json({Unauthorized: err.message})
          else {
            console.log(err)
            res.status(500).json(err)
          }
        })
    },
    getCards: (req, res) => {
      if (!req.params.user_id) {
        res.status(401).json({Unauthorized: 'ID required'})
        return;
      }

      db.cards.get(req.params.user_id)
        .then((results) => res.status(200).json(results))
        .catch((err) => res.status(500).json(err))
    },
  },
  admin: {
    generateUsers: (req, res) => {
      var userPormises = [];
      const fakeUsers = generateFakeUsers(25)

      for (let i = 0; i < fakeUsers.length; i++) {
        const {username, email, pass_hash} = fakeUsers[i]
        userPormises.push(db.admin.createUser(username, email, pass_hash))
      }
      Promise.all(userPormises)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
    }
  }
}

module.exports =  controllerFuncs;