import { createLogic } from 'redux-logic'
import { START_LISTENING, trackStatus, UPDATE_TRACK } from './actions'
import spotify, { SpotifyListener } from '../../spotify'
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
      const room = getState().room.room
      room.updateTrack(info)
      dispatch(trackStatus(info))
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
    const uri = info.track.uri
    const progress = info.progress
    spotify.changeTrack(token, uri, progress)
    dispatch(trackStatus(info))
  }
})

export default [
  startListeningLogic,
  updateTrackLogic
]
