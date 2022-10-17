//libs
import express from "express"
import handlebars from "express-handlebars";

const app = express();
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//SOCKET 

import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);

//DB
import DBContainer from "./container.js";
import mariaDB from "./options/mariaDB.js";
import sqliteConfig from "./sqliteConfig.js";
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const dataBaseProd = new DBContainer(mariaDB, "productos");
const dataBaseChat = new DBContainer(sqliteConfig, "chat");

console.log(path.join(__dirname, "/public"))

app.use(express.json());
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }));

// configuraciones
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs"); 
app.set("json spaces", 2); 
app.use("/", express.static(path.join(__dirname, "/views")))
//hbs

const hbs = handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + "/views",

})
app.engine("hbs", hbs);


app.get("/chat", (req, res) => {
    res.render("main", {layout:"chat"});  
});
const mensajes=[]
io.on('connection', async (socket) => {
socket.on('chat', async (data) =>{
    await dataBaseChat.add(data)
    mensajes.push(data);
    console.log('From client: ', message)
    io.emit( 'productos', await dataBaseProd.getAll())  

})
})  
httpServer.listen(3300, () => {
    console.log("Server ON");
}); 

app.get("/products", async (req, res) => {
    const menu = await DBContainer.getAll();
    res.send(menu);
});
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const products = await DBContainer.getbyId(id);
    res.send(products);
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



