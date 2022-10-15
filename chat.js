import knex from "knex";
import sqliteConfig from "./sqliteConfig.js";
const Knex = knex(sqliteConfig);

Knex.schema
.createTable("chat", (tabla) => {
    // ? id int auto_increment primary key
    tabla.increments("id");
    tabla.string("nombre");
    tabla.string("apellido");
    tabla.string("correo");
    tabla.string("chat");
    tabla.date("fecha"); 
})
.then(() => console.log("tabla creada!"))
.catch((e) => {
console.log("error!", e);
throw e;
})
.finally(() => {
Knex.destroy();
});
