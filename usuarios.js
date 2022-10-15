import knex from "knex";
import sqliteConfig from "./sqliteConfig.js";
const Knex = knex(sqliteConfig);

Knex.schema
.createTable("usuarios", (tabla) => {
    // ? id int auto_increment primary key
    tabla.increments("id");
    tabla.string("nombre");
    tabla.string("apellido");
    tabla.string("correo");
    tabla.string("chat");
    tabla.date("fecha");    
    tabla.integer("rango");
})
.then(() => console.log("tabla creada!"))
.catch((e) => {
console.log("error!", e);
throw e;
})
.finally(() => {
Knex.destroy();
});


// const socket = io()
// // const moment = require('moment');
// const date = new Date()
// // Levanto los controles del form de chat y el input de mensajes que se envian.
// const chat = document.querySelector('.chat-form')
// const Input = document.querySelector('.chat-input')
// const Correo = document.querySelector('.chat-Correo')

// // Evento submit del form de chat. Y emito el mensaje al servidor.
// chat.addEventListener('submit', event => {
//   event.preventDefault()
//   socket.emit('chat', Correo.value)
//   socket.emit('chat', Input.value) 
//   socket.emit("chat", date.toLocaleTimeString())
//   Input.value = ''
//   Correo.value= ''

// })

// // Levanto el chat window y pongo el mensaje que me llega de los otros clientes.
// const chatWindow = document.querySelector('.chat-window')

// const renderMessage = message => {
// const div = document.createElement('div')
// div.classList.add('render-message')
// div.innerText = message
// chatWindow.appendChild(div)
// }

// // Escucho el chat y renderizo los mensajes que me llegan.
// socket.on('chat', message => {
//   renderMessage(message)
// })