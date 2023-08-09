const db = require('./db.js')
const generateFakeUsers = require('./fakeData/user.js').fakeUsers

const toTimestamp = (strDate) => Date.parse(strDate) / 1000;

const controllerFuncs = {
  test: (req, res) => {
    db.test()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.sendStatus(500))
  },
  user: {
    generatePack: (req, res) => {
      const id = req.params.user_id;
      const currentTime = new Date().getTime() / 1000;

      if (!id) res.status(400).json({ERROR:'USERNAME'});

      db.pack.check.time(id)
        .then((result) => {
          const last_pack = toTimestamp(result[0].last_pack);
          console.log(last_pack + 86400 - currentTime)

          if (last_pack === null || last_pack + 86400 < currentTime) return;
          else res.status(405).json({ ERROR: 'WAIT' });
        })
        .then(() => db.pack.check.oldPack(id))
        .then((result) => {
          if (result.length === 0) return;
          else res.status(405).json({ ERROR: 'OLD_PACK' });
        })
        .catch((err) => {
          console.log(err)
          res.sendStatus(500)
        })

      // Check if user can create pack
        // If it has been long enough
        // If they have pack remaining

      // Create pack
        // Pick and Mark cards
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