import express from 'express'
import path from 'path'
import http from 'http'
import SocketIO, { Socket } from 'socket.io'
import { CreateRoomMsg, ConnectToRoomMsg } from '../room/types'
import Room from '../room/server'

const app = express()

const buildDir = path.join(__dirname, '../../', 'build')

app.use(express.static(buildDir))

app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'))

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
    const { username } = data
    const roomname = uniqueId()
    try{
      const room = new Room(roomname, username, client, () => deleteRoom(roomname))
      rooms[roomname] = room
      client.emit('create-room-success', room.data())
    }catch(err){
      client.emit('create-room-failed', err.toString())
    }
  })

  client.on('connect-to-room', (data: ConnectToRoomMsg) => {
    const { username, roomname } = data
    const room = rooms[roomname]
    try {
      room.addMember(username, client)
      client.emit('connect-to-room-success', room.data())
    } catch(err) {
      client.emit('connect-to-room-failed', err.toString())
    }
  })

})

server.listen(3000)
