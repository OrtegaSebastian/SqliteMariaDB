import knex from "knex";
import sqliteConfig from "./sqliteConfig.js";
const Knex = knex(sqliteConfig);


Knex.schema.createTable("chat",(table)=>{
    table.increments('id')
    table.string('fecha')
    table.string('correo')
    table.string('mensaje')

})
    .then(()=> console.log("table created"))
    .catch((err)=>{console.log(err); throw err})  



