const bcrypt = require('bcryptjs');

const hash1 = bcrypt.hashSync('bacon');
console.log(hash1)

const hash2 = bcrypt.hashSync('bacon');
console.log(hash2)

bcrypt.compare('bacon', hash2).then((res) => {
  if (res === true) {
    console.log("matched!")
  } else {
    console.log("no matched!")
  }
});