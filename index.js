
import express from "express"
import productosDB from "./contenedor.js";
import handlebars from "express-handlebars";
const app = express();
import mariaDB from "./options/mariaDB.js";
import sqliteConfig from "./sqliteConfig.js";
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const dataBaseProd = new productosDB(mariaDB, "productos");
const dataBaseChat = new productosDB(sqliteConfig, "chat");

app.use(express.json());
app.set("json spaces", 2);

app.get("/products", async (req, res) => {
    const menu = await dataBaseProd.getAll();
    res.send(menu);
});
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const menu = await dataBaseProd.getbyId(id);
    res.send(menu);
});  
app.post("/products", async (req, res) => {
    // * nombre, descripcion, precio, stock
    const { body } = req;
    await dataBaseProd.InsertValue(body);
    res.send(body);
});

app.put("/products/:id", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const result = await dataBaseProd.updateEntry(body, id);
    res.send({ result });
});

app.delete("/products/:id", async (req, res) => {
const { id } = req.params;
const result = await dataBaseProd.deleteEntry(id);
res.send({ result });
});

app.listen(8081, () => {
console.log("escuchando!");
});

//chat

import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//hbs
const hbs = handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + "/views",

})
app.engine("hbs", hbs);

// configuraciones
app.set("views", "./views");
app.set("view engine", "hbs");  

app.get("/chat", (req, res) => {
    res.render("main", {layout:"chat"});  
});
io.on('connection', async (socket) => {
socket.on('chat', message => {
    console.log('From client: ', message)
    io.emit( 'productos', await dataBaseProd.getAll())
    io.emit('chat', message)

})
})  
server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})

// const express = from 'express'
// const productosRoutes = require("./api/routes/productos");
// const carritoRoutes = require("./api/routes/carrito");
// const app = express();
// const port = process.env.PORT || 8080;


// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(express.static('api'));
// const context = process.env.CONTEXT || 'api';
// app.use('/api/productos', productosRoutes);
// app.use('/api/carritos', carritoRoutes);

// app.get('/', (req,res)=>{
//     res.send("Main page")
// })




// app.listen(port, () => {
//     console.log(`Listening on port ${port}...`);
// });


  