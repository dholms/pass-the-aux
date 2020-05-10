import { createLogic } from 'redux-logic'
import { START_LISTENING } from './actions'
import { GlobalState } from '../store'
import { SpotifyListener } from '../../spotify'

interface ProcessOpts {
  getState: () => GlobalState
  action: any
}

const startListeningLogic = createLogic({
  type: START_LISTENING,
  warnTimeout: 0,
  async process({ getState, action}: ProcessOpts, dispatch, done) {
    const state = getState()
    const token = state.user.token
    if(!token){
      throw new Error("User not logged in")
    }
    const listener = new SpotifyListener(token)
    for await (action of listener.start()){
      dispatch(action)
    }
  }
})

export default [
  startListeningLogic
]
