import { RoomAction, MEMBER_ADDED, MEMBER_REMOVED, JOINED_ROOM } from './actions'

export type RoomState = {
  name: string | null
  members: string[]
  leader: string | null
}

export const defaultState = {
  name: null,
  members: [],
  leader: null
}

export default (state = defaultState, action: RoomAction) => {
  switch(action.type) {

    case JOINED_ROOM:
      const { members, leader, name } = action.payload.room
      return {
        ...state,
        name,
        members,
        leader
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
