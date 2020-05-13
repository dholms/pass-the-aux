import { createLogic } from 'redux-logic'
import { START_LISTENING, trackUpdate } from './actions'
import { SpotifyListener } from '../../spotify'
import { ProcessOpts } from '../types'

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
      dispatch(trackUpdate(info))
    }
  }
})

export default [
  startListeningLogic
]
