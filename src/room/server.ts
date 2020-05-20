import { Socket } from 'socket.io'
import { RoomData, Member } from './types'

export default class RoomServer {
  
  name: string
  leader: string
  clientById: {[id: string]: Socket }
  userById: {[id: string]: Member }
  onEmpty: () => void

  constructor(name: string, username: string, image: string | null, client: Socket, onEmpty: () => void) {
    this.name = name
    this.leader = client.id
    this.clientById = {}
    this.userById = {}
    this.onEmpty = onEmpty
    this.addMember(username, image, client)
  }

  addMember(name: string, image: string | null, client: Socket) {
    const id = client.id
    if(this.clientById[id] !== undefined){
      throw new Error(`client is already in room: ${id}`)
    }
    this.clientById[id] = client
    this.userById[id] = {
      name,
      image,
      id
    }
    this.watchClient(client) 
    this.broadcastToRoom('member-added', name)
  }

  removeMember(id: string) {
    delete this.clientById[id]
    const name = this.userById[id]
    delete this.userById[id]
    this.broadcastToRoom('member-removed', name)
    if(Object.values(this.clientById).length === 0) {
      this.onEmpty()
    }
  }

  watchClient(client: Socket) {
    const id = client.id

    client.on('disconnect', () => {
      this.removeMember(id)
    })

    client.on('track-update', (data) => {
      if(id === this.leader) {
        this.broadcastToRoom('track-update', data)
      }
    })
  }

  broadcastToRoom(msg: string, data: object | string) {
    Object.values(this.clientById).forEach(c => {
      c.emit(msg, data)
    })
  }

  data(): RoomData {
    return {
      name: this.name,
      members: Object.values(this.userById),
      leader: this.leader
    }
  }
}

