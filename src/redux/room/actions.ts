import RoomClient from '../../room/client'

export const MEMBER_ADDED = 'MEMBER_ADDED'
export const MEMBER_REMOVED = 'MEMBER_REMOVED'
export const CREATE_ROOM = 'CREATE_ROOM'
export const CONNECT_TO_ROOM = 'CONNECT_TO_ROOM'
export const JOINED_ROOM = 'JOINED_ROOM'

interface MemberAddedAction {
  type: 'MEMBER_ADDED'
  payload: {
    name: string
  }
}

export const memberAdded = (name: string): MemberAddedAction => ({
  type: MEMBER_ADDED,
  payload: {
    name
  }
})

interface MemberRemovedAction {
  type: 'MEMBER_REMOVED'
  payload: {
    name: string
  }
}

export const memberRemoved = (name: string): MemberRemovedAction => ({
  type: MEMBER_REMOVED,
  payload: {
    name
  }
})

interface CreateRoomAction {
  type: 'CREATE_ROOM'
  payload: { }
}

export const createRoom = (): CreateRoomAction => ({
  type: CREATE_ROOM,
  payload: { }
})

interface ConnectToRoomAction {
  type: 'CONNECT_TO_ROOM'
  payload: {
    roomname: string
  }
}

export const connectToRoom = (roomname: string): ConnectToRoomAction => ({
  type: CONNECT_TO_ROOM,
  payload: {
    roomname
  }
})

interface JoinedRoomAction {
  type: 'JOINED_ROOM'
  payload: {
    room: RoomClient
  }
}

export const joinedRoom = (room: RoomClient): JoinedRoomAction => ({
  type: JOINED_ROOM,
  payload: {
    room
  }
})

export type RoomAction 
  = MemberAddedAction
  | MemberRemovedAction
  | CreateRoomAction
  | ConnectToRoomAction
  | JoinedRoomAction
