import { TrackAction, TRACK_STATUS } from './actions'
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

    case TRACK_STATUS:
      const { track, progress, paused } = action.payload
      return {
        ...state,
        curr: track,
        progress,
        paused
      }

    default:
      return state
  }
}
