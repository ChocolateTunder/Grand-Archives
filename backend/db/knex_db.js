const knex = require("knex");
const knexfile =require("./knexfile")

const db = knex(knexfile.development);
module.exports = db;
// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "password",
//     host: "localhost",
//     port: 5432,
//     database: "core"
// })

// module.exports = pool;