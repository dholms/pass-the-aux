import { createLogic } from 'redux-logic'
import { USER_LOGGED_IN } from './actions'
import spotify, { SpotifyListener } from '../../spotify'
import { ProcessOpts } from '../types'
import { PlaybackInfo } from '../../spotify/types'

const userLoggedInLogic = createLogic({
  type: USER_LOGGED_IN,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const state = getState()
    const token = action.payload.token

    // const listener = new SpotifyListener(token)
    // for await (const info of listener.start()){
    //   dispatch(trackStatus(info))
    // }
  }
})

export default [
  userLoggedInLogic,
]
