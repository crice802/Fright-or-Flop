#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import { Server } from 'socket.io'
 import { app } from '../server.js'
 import debug from 'debug'
 import https from 'https'
 import http from 'http'
 import fs from 'fs'
 import os from 'os'
 
 /**
  * Get port from environment and store in Express.
  */
 
 const port = normalizePort(process.env.PORT || '3000')
 app.set('port', port)
 
 /**
  * Create HTTP server.
  */
 
 let server
  
 /**
  * When we're in development we want to run our environment in https so that we
  * are able to keep our Google OAuth application set to in production. 
  * 
  * When we're in production Herkou will manage our certificates for us so we
  * still want to run our app in http, which lets heroku manage this process.
  */
 
 
 if (process.env.NODE_ENV !== 'production') {
   const homedir = os.homedir()
   
   const options = {
     key: fs.readFileSync(`${homedir}/certs/localhost/localhost.key`),
     cert: fs.readFileSync(`${homedir}/certs/localhost/localhost.crt`)
   }
   
   server = https.createServer(options, app)
 } else {
   server = http.createServer(app)
 }
 
 let chatters = {}
 
 let io = new Server(server)
 
 io.on('connection', socket => {
   // When anyone 'enters the room (loads the page)', add them to the list and play a sound
   socket.on('register-user', username => {
     chatters[socket.id] = username
     io.emit('user-enter')
     io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]))
   })
   
   // When anyone 'leaves the room (navigates away from the page)', remove them from the list and play a sound
   socket.on('disconnect', ()=> {
     delete chatters[socket.id]
     io.emit('user-exit')
     io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]))
   })
 
   // When anyone sends a message, send the message to all of the connected clients and play a sound
   socket.on('send_message', (data) => {
     io.sockets.emit('new_message', {
       message: data.message, 
       username: data.username,
       avatar: data.avatar
     })
   })
 
   // When anyone presses a key while typing a message, display a '(user) is typing...' message to all clients
   socket.on('typing', (data) => {
     socket.broadcast.emit('typing', {username: data.username})
   });
 
 })
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port)
 server.on('error', onError)
  server.on('listening', onListening)
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   const port = parseInt(val, 10)
 
   if (isNaN(port)) {
     // named pipe
     return val
   }
 
   if (port >= 0) {
     // port number
     return port
   }
 
   return false
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error
   }
 
   const bind = typeof port === 'string'? 'Pipe ' + port : 'Port ' + port
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges')
       process.exit(1)
       break
     case 'EADDRINUSE':
       console.error(bind + ' is already in use')
       process.exit(1)
       break
     default:
       throw error
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   const addr = server.address()
   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
   debug('Listening on ' + bind)
 }
 