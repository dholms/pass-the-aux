import express from 'express'
import path from 'path'
import http from 'http'
import SocketIO, { Socket } from 'socket.io'
import { CreateRoomMsg, ConnectToRoomMsg } from '../room/types'
import Room from '../room/server'

require('dotenv').config()

const BUILD_DIR = __dirname

const app = express()

app.use(express.static(BUILD_DIR))

app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'))
})

const server = http.createServer(app)
const io = SocketIO(server)

const rooms = {} as {[name: string]: Room}

const deleteRoom = (roomname: string) => {
  delete rooms[roomname]
}

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
const genId = () => {
  let id = ''
  for(let i=0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

const uniqueId = () => {
  while(true){
    const id = genId()
    if(rooms[id] === undefined){
      return id
    }
  }
}

io.on('connection', (client: Socket) => {

  client.on('create-room', (data: CreateRoomMsg) => {
    const { username, image } = data
    const roomname = uniqueId()
    try{
      const room = new Room(roomname, username, image, client, () => deleteRoom(roomname))
      rooms[roomname] = room
      client.emit('create-room-success', room.data())
    }catch(err){
      client.emit('create-room-failed', err.toString())
    }
  })

  client.on('connect-to-room', (data: ConnectToRoomMsg) => {
    const { username, image, roomname } = data
    let room = rooms[roomname]
    try {
      if(room === undefined){
        room = new Room(roomname, username, image, client, () => deleteRoom(roomname))
        rooms[roomname] = room
      }else {
        room.addMember(username, image, client)
      }
      client.emit('connect-to-room-success', room.data())
    } catch(err) {
      client.emit('connect-to-room-failed', err.toString())
    }
  })

})

const port = process.env.PORT || 3001
server.listen(port)
console.log(`Serving on port: ${port}`)
