import { createLogic } from 'redux-logic'
import { 
  START_LISTENING, STOP_LISTENING, UPDATE_TRACK,
  trackStatus, stoppedListening
} from './actions'
import spotify, { SpotifyListener, POLL_INTERVAL, DEBOUNCE_RANGE } from '../../spotify'
import { ProcessOpts } from '../types'
import { PlaybackInfo } from '../../spotify/types'

const startListeningLogic = createLogic({
  type: START_LISTENING,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const state = getState()
    const token = state.user.token
    if(!token){
      throw new Error("User not logged in")
    }
    const listener = new SpotifyListener(token)
    for await (const info of listener.start()){
      if(info === null){
        // @TODO Better feedback here
      } else {
        const room = getState().room.room
        if(room === null){
          // TODO: Better error handling here
          throw new Error("Not connect to room")
        }
        room.updateTrack(info)
        dispatch(trackStatus(info))
      }
    }
  }
})

const updateTrackLogic = createLogic({
  type: UPDATE_TRACK,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const token = getState().user.token
    const info: PlaybackInfo = action.payload
    if(!token){
      throw new Error("User not logged in")
    }
    const trackState = getState().track
    const stateUri = trackState.curr?.uri
    const stateProgress = trackState.progress || -DEBOUNCE_RANGE
    const statePaused = trackState.paused

    const uri = info.track.uri
    const { progress, paused } = info

    const progressDiff = Math.abs(progress - (stateProgress + POLL_INTERVAL))
    if(paused && !statePaused){
      await spotify.pauseTrack(token)
    } 
    if(!paused && 
      ( statePaused || 
        uri !== stateUri || 
        progressDiff > DEBOUNCE_RANGE
      )
      ){
      await spotify.changeTrack(token, uri, progress)
    }
    dispatch(trackStatus(info))
  }
})

const stopListeningLogic = createLogic({
  type: STOP_LISTENING,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const listener = getState().track.listener
    if(listener !== null){
      listener.stop()
    }
    dispatch(stoppedListening())
    done()
  }
})

export default [
  startListeningLogic,
  updateTrackLogic,
  stopListeningLogic
]
