const {options}= require('./options/mariaDB.js')
const Knex = require('knex')(options);


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
        Knex.destroy();
    })


    //Metodos a implementar en productos
    // module.exports = {
    //     save,
    //     getById,
    //     getAll,
    //     deleteById,
    //     updateById
    // };