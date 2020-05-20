export interface CreateRoomMsg {
  username: string
  image: string | null
}

export interface ConnectToRoomMsg {
  username: string
  roomname: string
  image: string | null
}

export interface Member {
  name: string
  image: string | null
  id: string
}

export interface RoomData {
  name: string
  members: Member[]
  leader: string
}
