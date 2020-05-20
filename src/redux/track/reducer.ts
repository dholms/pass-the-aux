import { TrackAction, TRACK_STATUS, STARTED_LISTENING, STOPPED_LISTENING } from './actions'
import { Track } from '../../spotify/types'
import { SpotifyListener } from '../../spotify'

export type TrackState = {
  curr: Track | null
  progress: number | null
  paused: boolean
  listener: SpotifyListener | null
}

export const defaultState = {
  curr: null,
  progress: null,
  paused: false,
  listener: null
}

export default (state: TrackState = defaultState, action: TrackAction) => {
  switch(action.type) {

    case TRACK_STATUS:
      const { track, progress, paused } = action.payload
      return {
        ...state,
        curr: track,
        progress,
        paused
      }

    case STARTED_LISTENING: 
      return {
        ...state,
        listener: action.payload.listener
      }

    case STOPPED_LISTENING:
      return {
        ...state,
        listener: null
      }

    default:
      return state
  }
}
