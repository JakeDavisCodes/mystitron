const SHA256 = require('crypto-js/sha256');

var adjectives = [
  'legendary',
  'sacred',
  'ancient',
  'mad',
  'complete',
  'extreme',
  'joyful',
  'bright',
  'vicious',
  'sacred',
  'lost',
  'craving',
  'madness',
  'soft',
  'honest',
  'kind',
  'eternal',
  'joy-bringer',
  'blessed',
  'soft',
  'chill',
  'divine',
  'eternal',
  'purple',
  'primordial',
  'violent',
  'holy',
  'complex',
  'powerful',
];
var nouns = [
  'Testament',
  'world',
  'joy',
  'song',
  'gods',
  'other',
  'video',
  'madness',
  'creatures',
  'Nerbs',
  'earth',
  'sacred',
  'web',
  'Closet',
  'Keeper',
  'people',
  'demon',
  'beast',
  'Tentacle Fiend',
  'village',
  'coast',
  'monsters',
  'beasts',
  'immortality',
  'Mist',
  'eternal being',
  'Soff',
  'storm',
  'lands',
  'kindness',
  'The Four Me-mes',
  'Giggle',
  'anime',
  'donkey',
  'sword',
  'zero',
  'dungeon',
  'sinkhole',
  'laughter',
  'universe',
  'mind',
  'Archimedes',
  'mathematics',
  'Tesla',
  'Einstein',
  'Brayden',
  'Nine Verses',
  'soul',
  'fire',
  'life',
]
var domains = [
  'flaswicitostestament.com',
  'uhnotpgnotforkids.com',
  'songofachilles.org',
  'thefourmemes.net',
  'thelostvideo.xyz',
  'theclosetkeeper.io',
  'thetentaclefiend.com',
  'themist.net',
  'twocreations.org',
  'ascension.xyz',
  'creation.net',
  'zero.org',
  'thesixpoopheads.com',
  'theanimegod.net',
  'skepsi.io',
  'thejoyfulgiggle.com',
  'thenineverses.org',
]
var passwords = [
  'legendaryworld78@',
  'sacredjoyful42!',
  'ancientdawning17#',
  'madgods92&',
  'completeother53@',
  'extremevideo21#',
  'joyfulmadness69&',
  'brightcreatures84!',
  'vicioussacred77#',
  'lostweb10@',
  'cravingNerbs96#',
  'madnessearth27&',
  'softsacred18@',
  'kindnessMist72!',
  'eternalweb39#',
  'completerainbows58&',
  'joy-bringerdungeon73@',
  'purplebeasts87!',
  'violentgay99#',
  'primordialgods66&',
  'complexsinkhole24!',
  'eternalbeing91@',
  'Giggleuniverse12&',
  'animeSoff37#',
  'donkeyzero60&',
  'swordlaughter45@',
  'mathematicsGiggle76#',
  'Braydengays19&',
  'Tentacle_Fiendarchimedes83!',
  'fakeDomains42#',
]

const generateUser = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const username = adjective + noun;

  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = username + '@' + domain;

  const password = passwords[Math.floor(Math.random() * passwords.length)];
  const pass_hash = SHA256(password);

  const user = {
    username,
    email,
    pass_hash,
  }

  console.log(email + ' | ' + password)

  return user;
}

module.exports = {
  fakeUsers: (num = 100) => {
    const users = [];

    for (let i = 0; i < num; i++) {
      users.push(generateUser())
    }

    return users;
  }
}