import io from 'socket.io-client'
import { PlaybackInfo } from "../spotify/types"

const SERVER_ADDR = 'http://localhost:3001'

export default class RoomClient {

  roomname: string
  username: string
  socket: SocketIOClient.Socket
  onTrackUpdate: ((data: PlaybackInfo) => void) | null = null
  onMemberAdded: ((name: string) => void) | null = null
  onMemberRemoved: ((name: string) => void) | null = null

  constructor(roomname: string, username: string, socket: SocketIOClient.Socket){
    this.roomname = roomname
    this.username = username
    this.socket = socket
    this.respondToUpdates()
  }

  static async create(roomname: string, username: string) {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('create-room', { roomname, username })
      socket.on('create-room-success', () => {
        resolve(new RoomClient(roomname, username, socket))
      })
      socket.on('create-room-failed', reject)
    })
  }

  static async connect(roomname: string, username: string) {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('connect-to-room', { roomname, username })
      socket.on('connect-to-room-success', () => {
        resolve(new RoomClient(roomname, username, socket))
      })
      socket.on('connect-to-room-failed', reject)
    })
  }

  respondToUpdates() {
    this.socket.on('track-update', (data: PlaybackInfo) => {
      if(this.onTrackUpdate !== null) {
        this.onTrackUpdate(data)
      }
    })

    this.socket.on('member-added', (name: string) => {
      if(this.onMemberAdded !== null) {
        this.onMemberAdded(name)
      }
    })

    this.socket.on('member-removed', (name: string) => {
      if(this.onMemberRemoved !== null) {
        this.onMemberRemoved(name)
      }
    })
  }
}
