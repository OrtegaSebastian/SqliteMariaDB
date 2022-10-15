const socket = io()
// const moment = require('moment');
const date = new Date()
// Levanto los controles del form de chat y el input de mensajes que se envian.
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')
const Correo = document.querySelector('.chat-Correo')

// Evento submit del form de chat. Y emito el mensaje al servidor.
chat.addEventListener('submit', event => {
event.preventDefault()
socket.emit('chat', Correo.value)
socket.emit('chat', Input.value) 
socket.emit("chat", date.toLocaleTimeString())
Input.value = ''
Correo.value= ''

})