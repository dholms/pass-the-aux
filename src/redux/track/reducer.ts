import { TrackAction, TRACK_CHANGED, TRACK_UPDATE } from './actions'
import { Track } from '../../spotify/types'

export type TrackState = {
  curr: Track | null
  progress: number | null
  paused: boolean
}

export const defaultState = {
  curr: null,
  progress: null,
  paused: false
}

export default (state = defaultState, action: TrackAction) => {
  switch(action.type) {

    case TRACK_UPDATE:
      const { track, progress, paused } = action.payload
      return {
        ...state,
        curr: track,
        progress,
        paused
      }

    case TRACK_CHANGED: 
      return {
        ...state,
        curr: action.payload.track
      }

    default:
      return state
  }
}
