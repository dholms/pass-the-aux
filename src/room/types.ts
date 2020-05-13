export interface CreateRoomMsg {
  username: string
  roomname: string
}

export interface ConnectToRoomMsg {
  username: string
  roomname: string
}

export interface RoomData {
  name: string
  members: string[]
  leader: string
}

