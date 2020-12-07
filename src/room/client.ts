import io from 'socket.io-client'
import { PlayerState } from "../spotify/types"
import { Member, RoomData } from './types'

const SERVER_ADDR = 
  process.env.NODE_ENV === 'production'
  ? "https://pass-the-aux-cord.herokuapp.com/"
  : "http://localhost:3001"

export default class RoomClient {

  socket: SocketIOClient.Socket
  name: string
  members: Member[]
  leader: string
  onTrackUpdate: ((data: PlayerState) => void) | null = null
  onMemberAdded: ((member: Member) => void) | null = null
  onMemberRemoved: ((id: string) => void) | null = null
  onAuxPassed: ((id: string) => void) | null = null

  constructor(name: string, members: Member[], leader: string, socket: SocketIOClient.Socket){
    this.name = name
    this.members = members
    this.leader = leader
    this.socket = socket
    this.respondToUpdates()
  }

  static async create(username: string, image: string | null = null): Promise<RoomClient> {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('create-room', { username, image })
      socket.on('create-room-success', (data: RoomData) => {
        const { name, members, leader } = data
        resolve(new RoomClient(name, members, leader, socket))
      })
      socket.on('create-room-failed', reject)
    })
  }

  static async connect(roomname: string, username: string, image: string | null = null): Promise<RoomClient> {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('connect-to-room', { roomname, username, image })
      socket.on('connect-to-room-success', (data: RoomData) => {
        const { name, members, leader }  = data
        resolve(new RoomClient(name, members, leader, socket))
      })
      socket.on('connect-to-room-failed', reject)
    })
  }

  updateTrack(data: PlayerState) {
    this.socket.emit('track-update', data)
  }

  passAux(id: string) {
    this.socket.emit('pass-aux', id)
  }

  respondToUpdates() {
    this.socket.on('track-update', (data: PlayerState) => {
      if(this.onTrackUpdate !== null) {
        this.onTrackUpdate(data)
      }
    })

    this.socket.on('member-added', (member: Member) => {
      if(this.onMemberAdded !== null) {
        this.onMemberAdded(member)
      }
    })

    this.socket.on('member-removed', (id: string) => {
      if(this.onMemberRemoved !== null) {
        this.onMemberRemoved(id)
      }
    })

    this.socket.on('aux-passed', (id: string) => {
      if(this.onAuxPassed !== null) {
        this.onAuxPassed(id)
      }
    })
  }
}
