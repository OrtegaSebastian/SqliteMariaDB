const {options}= require('./options/mariaDB.js')
const Knex = require('knex')(options);

Knex.from("productos")
.where("id", 2)
.del()
.then(() => console.log("articulos eliminados!"))
.catch((e) => console.log(e))
.finally(()=>{
    Knex.destroy();
})