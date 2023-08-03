const db = require('./db.js')
const generateFakeUser = require('./fakeData/user.js').fakeUsers

const controllerFuncs = {
  test: (req, res) => {
    db.test()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.sendStatus(500))
  },
  admin: {
    generateUsers: () => {
      var userPormises = [];

      for (let i = 0; i < 100; i++) {
        const {username, email, pass_hash} = generateFakeUser()
        userPormises.push(db.admin.createUser(username, email, pass_hash))
      }
      Promise.all(userPormises)
    }
  }
}

module.exports =  controllerFuncs;