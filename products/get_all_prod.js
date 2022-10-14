const {options}= require('../options/mariaDB')
const Knex = require('knex')(options);

Knex.from("productos")
.where("id", 3)
.then((rows) => console.table(rows))
.catch((e)=>{console.log(e)})
.finally(()=>{
    Knex.destroy();
})