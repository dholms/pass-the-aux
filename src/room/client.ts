import io from 'socket.io-client'
import { PlaybackInfo } from "../spotify/types"
import { RoomData } from './types'

const SERVER_ADDR = 'http://localhost:3000'

export default class RoomClient {

  socket: SocketIOClient.Socket
  name: string
  members: string[]
  leader: string
  onTrackUpdate: ((data: PlaybackInfo) => void) | null = null
  onMemberAdded: ((name: string) => void) | null = null
  onMemberRemoved: ((name: string) => void) | null = null

  constructor(name: string, members: string[], leader: string, socket: SocketIOClient.Socket){
    this.name = name
    this.members = members
    this.leader = leader
    this.socket = socket
    this.respondToUpdates()
  }

  static async create(username: string): Promise<RoomClient> {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('create-room', { username })
      socket.on('create-room-success', (data: RoomData) => {
        const { name, members, leader } = data
        resolve(new RoomClient(name, members, leader, socket))
      })
      socket.on('create-room-failed', reject)
    })
  }

  static async connect(roomname: string, username: string): Promise<RoomClient> {
    return new Promise((resolve, reject) => {
      const socket = io(SERVER_ADDR)
      socket.emit('connect-to-room', { roomname, username })
      socket.on('connect-to-room-success', (data: RoomData) => {
        const { name, members, leader }  = data
        resolve(new RoomClient(name, members, leader, socket))
      })
      socket.on('connect-to-room-failed', reject)
    })
  }

  updateTrack(data: PlaybackInfo) {
    this.socket.emit('track-update', data)
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
