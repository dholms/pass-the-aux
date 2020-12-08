import { RoomAction, MEMBER_ADDED, MEMBER_REMOVED, AUX_PASSED_SUCCESS, TRACK_STATUS, SYNC_PLAYER, AUX_PASSED } from './actions'
import RoomClient from '../../room/client'
import { Member } from '../../room/types'
import { PlayerState, SpotifyPlayer } from '../../spotify/types'

export type RoomState = {
  userId: string | null
  name: string | null
  members: Member[]
  leader: string | null
  room: RoomClient | null
  playerState: PlayerState | null
  player: SpotifyPlayer | null
}

export const defaultState = {
  userId: null,
  name: null,
  members: [],
  leader: null,
  room: null,
  playerState: null,
  player: null,
}

export default (state: RoomState = defaultState, action: RoomAction) => {
  switch(action.type) {

    case SYNC_PLAYER:
      const { room, player } = action.payload
      const { members, leader, name, socket } = room
      const userId = socket.id
      return {
        ...state,
        userId,
        name,
        members,
        leader,
        room,
        player
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

    case TRACK_STATUS:
      const playerState = action.payload
      return {
        ...state,
        playerState
      }

    default:
      return state
  }
}
