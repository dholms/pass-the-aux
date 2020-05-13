import http from 'http'
import SocketIO, { Socket } from 'socket.io'
import { CreateRoomMsg, ConnectToRoomMsg } from '../room/types'
import Room from '../room/server'

const server = http.createServer()
const io = SocketIO(server)

const rooms = {} as {[name: string]: Room}

const deleteRoom = (roomname: string) => {
  delete rooms[roomname]
}

io.on('connection', (client: Socket) => {

  client.on('create-room', (data: CreateRoomMsg) => {
    const { username, roomname } = data
    if(rooms[roomname]){
      client.emit('create-room-failed', 'Room already exists')
      return
    }
    try{
      const room = new Room(roomname, username, client, () => deleteRoom(roomname))
      rooms[roomname] = room
      client.emit('create-room-success', roomname)
    }catch(err){
      client.emit('create-room-failed', err.toString())
    }
  })

  client.on('connect-to-room', (data: ConnectToRoomMsg) => {
    const { username, roomname } = data
    const room = rooms[roomname]
    try {
      room.addMember(username, client)
      client.emit('connect-to-room-success', roomname)
    } catch(err) {
      client.emit('connect-to-room-failed', err.toString())
    }
  })

})

server.listen(3001)
