// const {
//   db: { username, password, database, host },
// } = require('./index');

// module.exports = {
//   development: {
//     username,
//     password,
//     database,
//     host,
//     dialect: 'postgres',
//     seederStorage: 'sequelize',
//   },
// };

const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });