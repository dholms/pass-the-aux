import { RoomAction, MEMBER_ADDED, MEMBER_REMOVED, JOINED_ROOM, AUX_PASSED } from './actions'
import RoomClient from '../../room/client'
import { Member } from '../../room/types'

export type RoomState = {
  userId: string | null
  name: string | null
  members: Member[]
  leader: string | null
  room: RoomClient | null
}

export const defaultState = {
  userId: null,
  name: null,
  members: [],
  leader: null,
  room: null,
}

export default (state: RoomState = defaultState, action: RoomAction) => {
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
          action.payload.member
        ]
      }

    case MEMBER_REMOVED: 
      const updated = state.members.filter(member => member.id !== action.payload.id)
      return {
        ...state,
        members: updated
      }

    case AUX_PASSED: 
      return {
        ...state,
        leader: action.payload.id
      }

    default:
      return state
  }
}
