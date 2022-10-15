import options from "./options/mariaDB.js"
import knex from "knex";
const Knex = knex(options)

Knex.schema.createTable("Tproductos",(table)=>{
    table.increments('id')
    table.string('nombre')
    table.string('descripcion')
    table.string('codigo')
    table.string ('foto')   
    table.integer('precio')
    table.integer('stock')
    table.integer('timestamp')
})
    .then(()=> console.log("table created"))
    .catch((err)=>{console.log(err); throw err})
    .finally(()=>{
        Knex.destroy();
    })


