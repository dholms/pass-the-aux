import { RoomAction, MEMBER_ADDED, MEMBER_REMOVED, JOINED_ROOM } from './actions'
import RoomClient from '../../room/client'

export type RoomState = {
  userId: string | null
  name: string | null
  members: string[]
  leader: string | null
  room: RoomClient
}

export const defaultState = {
  name: null,
  members: [],
  leader: null
}

export default (state = defaultState, action: RoomAction) => {
  switch(action.type) {

    case JOINED_ROOM:
      const room = action.payload.room
      const { members, leader, name, socket } = room
      const userId = socket.id
      return {
        ...state,
        userId,
        name,
        members,
        leader,
        room
      }

    case MEMBER_ADDED:
      return {
        ...state,
        members: [
          ...state.members,
          action.payload.name
        ]
      }

    case MEMBER_REMOVED: 
      const updated = state.members.filter(name => name !== action.payload.name)
      return {
        ...state,
        members: updated
      }

    default:
      return state
  }
}
