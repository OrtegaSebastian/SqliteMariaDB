const {options}= require('./options/mariaDB.js')
const Knex = require('knex')(options);

Knex.from("productos")
.where("id", 3)
.then((rows) => console.table(rows))
.catch((e)=>{console.log(e)})