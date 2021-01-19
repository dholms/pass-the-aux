import { RoomAction, MEMBER_ADDED, MEMBER_REMOVED, TRACK_STATUS, AUX_PASSED, JOINED_ROOM, CREATED_PLAYER, SET_VOLUME } from './actions'
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
  volume: number
}

export const defaultState = {
  userId: null,
  name: null,
  members: [],
  leader: null,
  room: null,
  playerState: null,
  player: null,
  volume: 0,
}

export default (state: RoomState = defaultState, action: RoomAction) => {
  switch(action.type) {

    case JOINED_ROOM:
      const { room } = action.payload
      const { members, leader, name, socket } = room
      const userId = socket.id
      return {
        ...state,
        userId,
        name,
        members,
        leader,
        room,
      }

    case CREATED_PLAYER:
      return {
        ...state,
        player: action.payload.player
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

    case SET_VOLUME: {
      return {
        ...state,
        volume: action.payload.volume
      }
    }

    default:
      return state
  }
}
