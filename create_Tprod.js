import knex from "knex"
import sqliteConfig from' ./sqliteConfig.js'
const Knex = knex(sqliteConfig);


Knex.schema.createTable('productos',table=>{
    table.increments('id')
    table.string('nombre')
    table.string('descripcion')
    table.string('codigo')
    table.string ('url')   
    table.integer('precio')
    table.integer('stock')
    table.integer('timestamp')
})
    .then(()=> console.log("table created"))
    .catch((err)=>{console.log(err); throw err})
    .finally(()=>{
        knex.destroy();
    })

const productos = [
        {nombre:"Lata Salta Roja",descripcion:"Cerveza Roja",codigo:"LAT001",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:160,stock:1000,timestamp:1664534924249},
        {nombre:"Lata 2",descripcion:"Cerveza azul",codigo:"LAT002",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:180,stock:1000,timestamp:1664534924249},
        {nombre:"Lata 3",descripcion:"Cerveza verde",codigo:"LAT003",foto:"http://www.productos.com.ar/fotos/lataroja.jpg",precio:360,stock:1000,timestamp:1664534924249}
    ]
    
Knex('productos').insert(productos)
        .then(()=> console.log("data inserted"))
        .catch((error)=>{console.log(error); throw error})
        .finally(()=>{
            Knex.destroy()
        })
    //Metodos a implementar en productos
    // module.exports = {
    //     save,
    //     getById,
    //     getAll,
    //     deleteById,
    //     updateById
    // };