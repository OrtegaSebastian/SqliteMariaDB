import options from "./options/mariaDB.js"
import knex from "knex";
const Knex = knex(options)

const productos = [
    {nombre:"Lata Salta Roja",descripcion:"Cerveza Roja",codigo:"LAT001",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:160,stock:1000,timestamp:1664534924249},
    {nombre:"Lata 2",descripcion:"Cerveza azul",codigo:"LAT002",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:180,stock:1000,timestamp:1664534924249},
    {nombre:"Lata 3",descripcion:"Cerveza verde",codigo:"LAT003",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:360,stock:1000,timestamp:1664534924249}
]

Knex('Tproductos').insert(productos)
    .then(()=> console.log("data inserted"))
    .catch((error)=>{console.log(error); throw error})
    .finally(()=>{
        Knex.destroy()
    })