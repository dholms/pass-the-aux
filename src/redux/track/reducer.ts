import { TrackAction, TRACK_STATUS, STARTED_LISTENING } from './actions'
import { PlayerState, SpotifyPlayer } from '../../spotify/types'

export type TrackState = {
  playerState: PlayerState | null
  player: SpotifyPlayer | null
}

export const defaultState = {
  playerState: null,
  player: null
}

export default (state: TrackState = defaultState, action: TrackAction) => {
  switch(action.type) {

    case TRACK_STATUS:
      const playerState = action.payload
      return {
        ...state,
        playerState
      }

    case STARTED_LISTENING: 
      return {
        ...state,
        player: action.payload.player
      }

    default:
      return state
  }
}
